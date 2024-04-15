'use client'
import Chart from '@/components/chart'
import KPICard from '@/components/kpicard'
import { Card } from '@tremor/react'

const valueFormatter = (number: number) => Intl.NumberFormat('es-ES').format(number).toString()

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
    change: '+6.1%',
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

export default function Dashboard() {
  return (
    <Card className="flex min-h-screen flex-col items-center md:p-24">
      <Card className="flex flex-col md:flex-row gap-5 ">
        {kpis.map((kpi) => (
          <KPICard key={kpi.name} name={kpi.name} value={kpi.value} change={kpi.change} changeType={kpi.changeType} />
        ))}
      </Card>
      <Card>
        <Chart
          data={data[0].data}
          categories={data[0].categories}
          colors={data[0].colors}
          valueFormatter={valueFormatter}
        />
      </Card>
    </Card>
  )
}
