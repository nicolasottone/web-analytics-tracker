'use client'
import { BarChart, Card } from '@tremor/react'

interface ChartProps {
  data: any[]
  categories: string[]
  colors: string[]
  valueFormatter?: (value: number) => string
}

const Chart = ({ data, categories, colors, valueFormatter }: ChartProps) => {
  return (
    <Card className="w-full h-full min-h-0 min-w-0">
      <BarChart
        data={data}
        index="date"
        categories={categories}
        colors={colors}
        stack={true}
        showLegend={false}
        yAxisWidth={38}
        valueFormatter={valueFormatter}
        className="mt-10 hidden h-72 md:block"
        showAnimation
        animationDuration={100}
      />
      <BarChart
        data={data}
        index="date"
        categories={categories}
        colors={colors}
        stack={true}
        showLegend={false}
        showYAxis={false}
        valueFormatter={valueFormatter}
        className="mt-6 h-72 md:hidden"
        showAnimation
        animationDuration={100}
      />
    </Card>
  )
}

export default Chart
