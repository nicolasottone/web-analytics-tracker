'use client'
import Chart from '@/components/chart'
import GeograficChart from '@/components/geografic_chart'
import KPICard from '@/components/kpicard'
import RankingList from '@/components/ranking_list'
import SettingNav from '@/components/settings_nav'
import { valueFormatter } from '@/lib/utils'
import { Card, DateRangePickerValue, TabGroup, TabPanel, TabPanels, Divider } from '@tremor/react'
import { useState } from 'react'

const visits = [
  {
    date: 'Aug 09',
    '/home': 951,
    '/contact': 0
  },
  {
    date: 'Aug 10',
    '/home': 1232,
    '/contact': 0
  },
  {
    date: 'Aug 11',
    '/home': 1230,
    '/contact': 0
  },
  {
    date: 'Aug 12',
    '/home': 1289,
    '/contact': 0
  },
  {
    date: 'Aug 13',
    '/home': 1002,
    '/contact': 0
  },
  {
    date: 'Aug 14',
    '/home': 1034,
    '/contact': 0
  },
  {
    date: 'Aug 15',
    '/home': 1140,
    '/contact': 0
  },
  {
    date: 'Aug 16',
    '/home': 1280,
    '/contact': 0
  },
  {
    date: 'Aug 17',
    '/home': 1345,
    '/contact': 0
  },
  {
    date: 'Aug 18',
    '/home': 1432,
    '/contact': 0
  },
  {
    date: 'Aug 19',
    '/home': 1321,
    '/contact': 0
  },
  {
    date: 'Aug 20',
    '/home': 1230,
    '/contact': 0
  },
  {
    date: 'Aug 21',
    '/home': 1020,
    '/contact': 0
  },
  {
    date: 'Aug 22',
    '/home': 1040,
    '/contact': 0
  },
  {
    date: 'Aug 23',
    '/home': 610,
    '/contact': 81
  },
  {
    date: 'Aug 24',
    '/home': 610,
    '/contact': 87
  },
  {
    date: 'Aug 25',
    '/home': 610,
    '/contact': 92
  },
  {
    date: 'Aug 26',
    '/home': 501,
    '/contact': 120
  },
  {
    date: 'Aug 27',
    '/home': 480,
    '/contact': 120
  },
  {
    date: 'Aug 28',
    '/home': 471,
    '/contact': 120
  },
  {
    date: 'Aug 29',
    '/home': 610,
    '/contact': 89
  },
  {
    date: 'Aug 30',
    '/home': 513,
    '/contact': 199
  },
  {
    date: 'Aug 31',
    '/home': 500,
    '/contact': 56
  }
]

const events = [
  {
    date: 'Aug 06',
    'Submit form': 870,
    'More Info': 660,
    'Fill form': 100,
    'Use chatbot': 110
  },
  {
    date: 'Aug 07',
    'Submit form': 790,
    'More Info': 590,
    'Fill form': 120,
    'Use chatbot': 80
  },
  {
    date: 'Aug 08',
    'Submit form': 910,
    'More Info': 700,
    'Fill form': 90,
    'Use chatbot': 120
  },
  {
    date: 'Aug 09',
    'Submit form': 951,
    'More Info': 741,
    'Fill form': 90,
    'Use chatbot': 120
  },
  {
    date: 'Aug 10',
    'Submit form': 1232,
    'More Info': 1040,
    'Fill form': 100,
    'Use chatbot': 92
  },
  {
    date: 'Aug 11',
    'Submit form': 1230,
    'More Info': 1030,
    'Fill form': 100,
    'Use chatbot': 100
  },
  {
    date: 'Aug 12',
    'Submit form': 1289,
    'More Info': 1099,
    'Fill form': 100,
    'Use chatbot': 90
  },
  {
    date: 'Aug 13',
    'Submit form': 1002,
    'More Info': 842,
    'Fill form': 70,
    'Use chatbot': 90
  },
  {
    date: 'Aug 14',
    'Submit form': 1034,
    'More Info': 884,
    'Fill form': 80,
    'Use chatbot': 70
  },
  {
    date: 'Aug 15',
    'Submit form': 1140,
    'More Info': 970,
    'Fill form': 100,
    'Use chatbot': 70
  },
  {
    date: 'Aug 16',
    'Submit form': 1280,
    'More Info': 1120,
    'Fill form': 90,
    'Use chatbot': 70
  },
  {
    date: 'Aug 17',
    'Submit form': 1345,
    'More Info': 1185,
    'Fill form': 90,
    'Use chatbot': 55
  },
  {
    date: 'Aug 18',
    'Submit form': 1432,
    'More Info': 1272,
    'Fill form': 90,
    'Use chatbot': 55
  },
  {
    date: 'Aug 19',
    'Submit form': 1321,
    'More Info': 1161,
    'Fill form': 90,
    'Use chatbot': 55
  },
  {
    date: 'Aug 20',
    'Submit form': 1230,
    'More Info': 1070,
    'Fill form': 100,
    'Use chatbot': 60
  },
  {
    date: 'Aug 21',
    'Submit form': 1020,
    'More Info': 1090,
    'Fill form': 90,
    'Use chatbot': 60
  },
  {
    date: 'Aug 22',
    'Submit form': 1040,
    'More Info': 510,
    'Fill form': 100,
    'Use chatbot': 430
  },
  {
    date: 'Aug 23',
    'Submit form': 610,
    'More Info': 510,
    'Fill form': 100,
    'Use chatbot': 430
  },
  {
    date: 'Aug 24',
    'Submit form': 610,
    'More Info': 510,
    'Fill form': 100,
    'Use chatbot': 430
  },
  {
    date: 'Aug 25',
    'Submit form': 610,
    'More Info': 381,
    'Fill form': 100,
    'Use chatbot': 129
  },
  {
    date: 'Aug 26',
    'Submit form': 501,
    'More Info': 360,
    'Fill form': 100,
    'Use chatbot': 120
  },
  {
    date: 'Aug 27',
    'Submit form': 480,
    'More Info': 351,
    'Fill form': 100,
    'Use chatbot': 120
  },
  {
    date: 'Aug 28',
    'Submit form': 471,
    'More Info': 510,
    'Fill form': 100,
    'Use chatbot': 0
  },
  {
    date: 'Aug 29',
    'Submit form': 610,
    'More Info': 414,
    'Fill form': 100,
    'Use chatbot': 0
  },
  {
    date: 'Aug 30',
    'Submit form': 513,
    'More Info': 444,
    'Fill form': 100,
    'Use chatbot': 0
  },
  {
    date: 'Aug 31',
    'Submit form': 500,
    'More Info': 510,
    'Fill form': 100,
    'Use chatbot': 0
  }
]

//mock data
const data: TData = [
  {
    name: 'Visits',
    data: visits,
    categories: ['/home', '/contact'],
    colors: ['blue', 'red'],
    summary: [
      {
        name: '/home',
        total: 23450,
        color: 'bg-blue-500'
      },
      {
        name: '/contact',
        total: 1397,
        color: 'bg-red-500'
      }
    ]
  },
  {
    name: 'Events',
    data: events,
    categories: ['Submit form', 'More Info', 'Fill form', 'Use chatbot'],
    colors: ['blue', 'cyan', 'violet'],
    summary: [
      {
        name: 'Submit form',
        total: 23450,
        color: 'bg-blue-500'
      },
      {
        name: 'More Info',
        total: 1397,
        color: 'bg-cyan-500'
      },
      {
        name: 'Fill form',
        total: 1397,
        color: 'bg-violet-500'
      },
      {
        name: 'Use chatbot',
        total: 1397,
        color: 'bg-blue-100'
      }
    ]
  }
]

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

type TData = {
  name: string
  data: any[]
  categories: string[]
  colors: string[]
  summary: {
    name: string
    total: number
    color: string
  }[]
}[]

const pages = [
  {
    name: '/home',
    value: 2019
  },
  {
    name: '/blocks',
    value: 1053
  },
  {
    name: '/components',
    value: 997
  },
  {
    name: '/docs/getting-started/installation',
    value: 982
  },
  {
    name: '/docs/components/button',
    value: 782
  },
  {
    name: '/docs/components/table',
    value: 752
  },
  {
    name: '/docs/components/area-chart',
    value: 741
  },
  {
    name: '/docs/components/badge',
    value: 750
  },
  {
    name: '/docs/components/bar-chart',
    value: 750
  },
  {
    name: '/docs/components/tabs',
    value: 720
  },
  {
    name: '/docs/components/tracker',
    value: 723
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

export default function Dashboard() {
  const [dateRange, setDateRange] = useState<DateRangePickerValue>({})

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
                <Card>
                  <Chart
                    data={metric.data}
                    categories={metric.categories}
                    colors={metric.colors}
                    valueFormatter={valueFormatter}
                  />
                </Card>
              </TabPanel>
            ))}
            <Divider />
            <Card className="flex flex-col xl:flex-row gap-5 justify-between">
              <RankingList title="Top Pages" metric="VISITS" items={pages} />
              <GeograficChart data={countrys} />
            </Card>
          </TabPanels>
        </TabGroup>
      </Card>
    </div>
  )
}
