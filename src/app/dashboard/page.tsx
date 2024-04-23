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

type TData = {
  name: string
  data: any[]
  categories: string[]
  colors?: string[]
  summary: {
    name: string
    total: number
    color?: string
  }[]
}[]

const kpis = [
  {
    name: 'Average pageviews',
    value: '230',
    changeType: 'positive'
  },
  {
    name: 'Unique visitors',
    value: '166',
    change: '+1.2%',
    changeType: 'positive'
  },
  {
    name: 'Average ession duration',
    value: '1 min',
    change: '-1.2%',
    changeType: 'negative'
  }
]

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
          <div className="flex flex-col md:flex-row gap-5">
            {kpis.map((kpi) => (
              <KPICard
                key={kpi.name}
                name={kpi.name}
                value={kpi.value}
                change={kpi.change}
                changeType={kpi.changeType}
              />
            ))}
          </div>
          <Divider />
          <SettingNav tabs={data} dateValue={dateRange} onDatePick={setDateRange} />
          <TabPanels className="mt-5">
            {data.map((metric) => (
              <TabPanel key={metric.name}>
                <Chart data={metric.data} categories={metric.categories} valueFormatter={valueFormatter} />
              </TabPanel>
            ))}
            <Divider />
            <Card className="flex flex-col xl:flex-row gap-5 justify-between">
              <TabPanels>
                {data.map((metric) => (
                  <TabPanel key={metric.name}>
                    <RankingList
                      title={`Top ${metric.name}`}
                      metric={metric.name == 'Events' ? 'PAGES' : 'EVENTS'}
                      items={metric.summary}
                    />
                  </TabPanel>
                ))}
              </TabPanels>
              <GeograficChart data={countrys} />
            </Card>
          </TabPanels>
        </TabGroup>
      </Card>
    </div>
  )
}
