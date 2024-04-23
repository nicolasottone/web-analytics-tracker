import { analytics } from '@/utils/analytics'
import { eachDayOfInterval, format } from 'date-fns'
import { NextRequest, NextResponse } from 'next/server'

interface DataItem {
  [category: string]: string | number
}

interface DailyData {
  pageviews: DataItem
  events: DataItem
  visitors: DataItem
}
type DataResponse = {
  name: string
  data: any[]
  categories: string[]
  summary: {
    name: string
    total: number
  }[]
}[]

export async function POST(req: NextRequest) {
  const res = await req.json()
  if (res.to === undefined) res.to = res.from
  const { from, to } = res

  let daysDate: Date[] = []
  if (from !== to) {
    daysDate = eachDayOfInterval({ start: from, end: to })
  } else daysDate.push(from)

  const dataFetched = await analytics.retrieveDays(daysDate)

  const dailyData: DailyData[] = dataFetched.map((dayData, i) => {
    const date = format(daysDate[i], 'MMM dd')
    const dayResult: DailyData = { pageviews: { date: date }, events: { date: date }, visitors: { date: date } }

    if (dayData) {
      Object.entries(dayData).forEach(([fieldName, amount]) => {
        const name = JSON.parse(fieldName)
        if (name.pageviews) dayResult.pageviews[name.pageviews] = Number(amount)
        if (name.event) dayResult.events[name.event] = Number(amount)
        if (name.visits) dayResult.visitors[name.visits] = Number(amount)
      })
    }

    return dayResult
  })

  const summary = getSummary(dailyData)
  const pageviewsCategories = Object.keys(summary.pageviews)
  const eventsCategories = Object.keys(summary.events)
  const visitorsCategories = Object.keys(summary.visitors)

  const response: DataResponse = [
    {
      name: 'Pageviews',
      data: dailyData.map((day) => day.pageviews),
      categories: pageviewsCategories,
      summary: pageviewsCategories.map((category) => {
        return { name: category, total: summary.pageviews[category] }
      })
    },
    {
      name: 'Events',
      data: dailyData.map((day) => day.events),
      categories: eventsCategories,
      summary: eventsCategories.map((category) => {
        return {
          name: category,
          total: summary.events[category]
        }
      })
    },
    {
      name: 'Visitors',
      data: dailyData.map((day) => day.visitors),
      categories: visitorsCategories,
      summary: visitorsCategories.map((category) => {
        return {
          name: category,
          total: summary.events[category]
        }
      })
    }
  ]

  return NextResponse.json({ body: response })
}

function getSummary(dailyData: DailyData[]) {
  const total = { pageviews: Object(), events: Object(), visitors: Object() }

  dailyData.forEach((day) => {
    Object.keys(day.pageviews).forEach((category) => {
      if (category !== 'date') {
        total.pageviews[category] = (total.pageviews[category] ?? 0) + day.pageviews[category]
      }
    })
    Object.keys(day.events).forEach((category) => {
      if (category !== 'date') {
        total.events[category] = (total.events[category] ?? 0) + day.events[category]
      }
    })
    Object.keys(day.visitors).forEach((category) => {
      if (category !== 'date') {
        total.visitors[category] = (total.visitors[category] ?? 0) + day.visitors[category]
      }
    })
  })
  return total
}
