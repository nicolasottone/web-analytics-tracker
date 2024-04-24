import { getTotal, valueFormatter } from '@/utils'
import { Card, DonutChart, List, ListItem } from '@tremor/react'
import { ReactCountryFlag } from 'react-country-flag'

interface GeograficChartProps {
  data: {
    name: string
    total: number
    color?: string
  }[]
}

export default function GeograficChart({ data }: GeograficChartProps) {
  if (!data.length) {
    return (
      <Card className="sm:mx-auto max-w-3xl xl:max-w-lg xl:min-h-96">
        <p>Loading data</p>
      </Card>
    )
  }

  const total = getTotal(data)
  const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' })
  const newData = data.map((country) => ({
    name: regionNamesInEnglish.of(country.name),
    total: country.total,
    share: String(((country.total / total) * 100).toFixed(1)) + '%',
    code: country.name
  }))

  return (
    <>
      <Card className="sm:mx-auto max-w-3xl xl:max-w-lg xl:min-h-96">
        <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Total visits by country
        </h3>
        <DonutChart
          className="mt-8"
          data={newData}
          category="total"
          index="name"
          valueFormatter={valueFormatter}
          showTooltip={false}
          showAnimation
          colors={['cyan', 'blue', 'indigo', 'violet', 'fuchsia']}
        />
        <p className="mt-8 flex items-center justify-between text-tremor-label text-tremor-content dark:text-dark-tremor-content">
          <span>Country</span>
          <span>Amount / Share</span>
        </p>
        <List className="mt-2">
          {newData.map((item) => (
            <ListItem key={item.name} className="space-x-6">
              <div className="flex items-center space-x-2.5 truncate">
                <ReactCountryFlag className="text-xl " svg countryCode={item.code} />
                <span className="truncate dark:text-dark-tremor-content-emphasis">{item.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium tabular-nums text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  {valueFormatter(item.total)}
                </span>
                <span className="rounded-tremor-small bg-tremor-background-subtle px-1.5 py-0.5 text-tremor-label font-medium tabular-nums text-tremor-content-emphasis dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis">
                  {item.share}
                </span>
              </div>
            </ListItem>
          ))}
        </List>
      </Card>
    </>
  )
}
