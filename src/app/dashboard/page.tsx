'use client'
import Chart from '@/components/chart'
import GeograficChart from '@/components/geografic_chart'
import KPICard from '@/components/kpicard'
import RankingList from '@/components/ranking_list'
import SettingNav from '@/components/settings_nav'
import { getAverage, getTotal, valueFormatter } from '@/utils'
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
  const kpis: Record<NameSpaces, { total: number; avg: number }> = {
    Pageviews: { total: 0, avg: 0 },
    Events: { total: 0, avg: 0 },
    Visitors: { total: 0, avg: 0 }
  }

  if (data.length) {
    for (const item of data) {
      kpis[item.name] = {
        total: getTotal(item.summary),
        avg: getAverage(item.summary, item.data.length)
      }
    }
  }
  return [
    [
      { name: 'Total Pageviews', value: String(kpis.Pageviews.total) },
      { name: 'Average Pageviews per Day', value: String(kpis.Pageviews.avg.toFixed()) },
      { name: 'Unique Visitors', value: String(kpis.Visitors.total) }
    ],
    [
      { name: 'Total Events', value: String(kpis.Events.total) },
      { name: 'Average Events per Day', value: String(kpis.Events.avg.toFixed()) },
      { name: 'Unique Visitors', value: String(kpis.Visitors.total) }
    ]
  ]
}
