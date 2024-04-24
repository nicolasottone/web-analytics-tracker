'use client'
import Chart from '@/components/chart'
import GeograficChart from '@/components/geografic_chart'
import KPICard from '@/components/kpicard'
import RankingList from '@/components/ranking_list'
import SettingNav from '@/components/settings_nav'
import { valueFormatter } from '@/utils'
import { Card, DateRangePickerValue, TabGroup, TabPanel, TabPanels, Divider } from '@tremor/react'
import { subDays } from 'date-fns'
import { useEffect, useState } from 'react'

type NameSpaces = 'Pageviews' | 'Events' | 'Visitors'
type TData = {
  name: NameSpaces
  data: any[]
  categories: string[]
  colors?: string[]
  summary: {
    name: string
    total: number
    color?: string
  }[]
}[]

const countrys = [
  {
    name: 'Argentina',
    total: 6730,
    share: '32.1%',
    color: 'bg-cyan-500'
  },
  {
    name: 'USA',
    total: 4120,
    share: '19.6%',
    color: 'bg-blue-500'
  },
  {
    name: 'Germany',
    total: 3920,
    share: '18.6%',
    color: 'bg-indigo-500'
  },
  {
    name: 'French',
    total: 3210,
    share: '15.3%',
    color: 'bg-violet-500'
  },
  {
    name: 'Uruguay',
    total: 3010,
    share: '14.3%',
    color: 'bg-fuchsia-500'
  }
]

async function fetchData(from: Date, to: Date) {
  const response = await fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: from, to: to })
  })
  return response
}

export default function Dashboard() {
  const [dateRange, setDateRange] = useState<DateRangePickerValue>({ from: subDays(new Date(), 6), to: new Date() })
  const [data, setData] = useState<TData>([])

  const kpis = getKPIs(data)
  const tabs: { name: NameSpaces }[] = [{ name: 'Pageviews' }, { name: 'Events' }]
  const colors = ['blue', 'teal', 'amber', 'rose', 'indigo', 'emerald', 'cyan', 'pink', 'indigo', 'red', 'violet']

  useEffect(() => {
    if (dateRange.from !== undefined) {
      fetchData(dateRange.from!, dateRange.to!)
        .then((res) => res.json())
        .then((data) => setData(data.body))
    }
  }, [dateRange])

  return (
    <div className="container mx-auto md:my-20">
      <Card className="flex flex-col items-center">
        <TabGroup>
          <TabPanels>
            {kpis.map((category, i) => (
              <TabPanel key={category[i].name}>
                <div className="flex flex-col md:flex-row gap-5">
                  {category.map((kpi) => (
                    <KPICard key={kpi.name} name={kpi.name} value={kpi.value} />
                  ))}
                </div>
              </TabPanel>
            ))}
          </TabPanels>
          <Divider />
          <SettingNav tabs={tabs} dateValue={dateRange} onDatePick={setDateRange} />
          <TabPanels className="mt-5">
            {data.map((metric) => (
              <TabPanel key={metric.name}>
                <Chart
                  data={metric.data}
                  categories={metric.categories}
                  valueFormatter={valueFormatter}
                  colors={colors}
                />
              </TabPanel>
            ))}
            <Divider />
            <Card className="flex flex-col xl:flex-row gap-5 justify-between">
              <TabPanels>
                {data.map((metric) => (
                  <TabPanel key={metric.name}>
                    <RankingList
                      title={`Top ${metric.name}`}
                      metric={metric.name == 'Events' ? 'EVENTS' : 'VIEWS'}
                      items={metric.summary}
                    />
                  </TabPanel>
                ))}
              </TabPanels>
              <GeograficChart data={data.length ? data[2].summary : []} />
            </Card>
          </TabPanels>
        </TabGroup>
      </Card>
    </div>
  )
}

function getKPIs(data: TData) {
  const kpis = { totalViews: 0, avgViews: 0, totalEvents: 0, avgEvents: 0, totalVisitors: 0 }

  if (data.length) {
    const [pageviewsKPIs, eventsKPIs, visitorsKPI] = ['Pageviews', 'Events', 'Visitors'].map((nameSpace) => {
      const item = data.find((item) => item.name === nameSpace)
      if (!item) {
        return { total: 0, avg: 0 }
      }
      const total = item.summary.reduce((acc, cur) => acc + cur.total, 0)
      const avg = Number(total / item.data.length)
      return { total, avg }
    })

    kpis.totalViews = pageviewsKPIs.total
    kpis.avgViews = pageviewsKPIs.avg
    kpis.totalEvents = eventsKPIs.total
    kpis.avgEvents = eventsKPIs.avg
    kpis.totalVisitors = visitorsKPI.total
  }

  return [
    [
      { name: 'Total Pageviews', value: String(kpis.totalViews) },
      { name: 'Average Pageviews', value: String(kpis.avgViews.toFixed()) },
      { name: 'Unique Visitors', value: String(kpis.totalVisitors) }
    ],
    [
      { name: 'Total Events', value: String(kpis.totalEvents) },
      { name: 'Average Events', value: String(kpis.avgEvents.toFixed()) },
      { name: 'Unique Visitors', value: String(kpis.totalVisitors) }
    ]
  ]
}
