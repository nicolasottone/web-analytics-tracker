// 'use client';
import { classNames, valueFormatter } from '@/utils'
import { Card, DonutChart, List, ListItem } from '@tremor/react'

interface GeograficChartProps {
  data: {
    name: string
    total: number
    share: string
    color: string
  }[]
}

export default function GeograficChart({ data }: GeograficChartProps) {
  return (
    <>
      <Card className="sm:mx-auto max-w-3xl xl:max-w-lg">
        <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Total visits by country
        </h3>
        <DonutChart
          className="mt-8"
          data={data}
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
          {data.map((item) => (
            <ListItem key={item.name} className="space-x-6">
              <div className="flex items-center space-x-2.5 truncate">
                <span className={classNames(item.color, 'h-2.5 w-2.5 shrink-0 rounded-sm')} aria-hidden={true} />
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
