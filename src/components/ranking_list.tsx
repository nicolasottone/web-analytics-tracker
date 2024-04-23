import { valueFormatter } from '@/utils'
import { BarList, Card } from '@tremor/react'

interface RankingListProps {
  title: string
  metric: string
  color?: string
  items: {
    name: string
    total: number
    color?: string
  }[]
}

export default function RankingList({ title, metric, items, color }: RankingListProps) {
  const data = items.map((item) => {
    return {
      name: item.name,
      value: item.total
    }
  })
  return (
    <>
      <Card className="p-0 sm:mx-auto sm:max-w-3xl">
        <div className="flex items-center justify-between border-b border-tremor-border p-6 dark:border-dark-tremor-border">
          <p className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">{title}</p>
          <p className="text-tremor-label font-medium uppercase text-tremor-content dark:text-dark-tremor-content">
            {metric}
          </p>
        </div>
        <div className={`overflow-hidden p-6`}>
          <BarList color={color ? color : 'blue'} data={data} valueFormatter={valueFormatter} showAnimation />
        </div>
      </Card>
    </>
  )
}
