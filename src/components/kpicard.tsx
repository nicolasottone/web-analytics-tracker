// 'use client';
import { classNames } from '@/lib/utils'
import { Card } from '@tremor/react'

interface KPICardProps {
  name: string
  value: string
  change?: string
  changeType: 'negative' | 'positive' | string
}

export default function KPICard({ name, value, change, changeType }: KPICardProps) {
  return (
    <Card>
      <p className="flex items-start justify-between">
        <span className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {value}
        </span>
        <span
          className={classNames(
            change
              ? changeType === 'positive'
                ? 'bg-emerald-100 text-emerald-800 ring-emerald-600/10 dark:bg-emerald-400/10 dark:text-emerald-500 dark:ring-emerald-400/20'
                : 'bg-red-100 text-red-800 ring-red-600/10 dark:bg-red-400/10 dark:text-red-500 dark:ring-red-400/20'
              : 'hidden',
            'inline-flex items-center rounded-tremor-small px-2 py-1 text-tremor-label font-medium ring-1 ring-inset'
          )}
        >
          {change}
        </span>
      </p>
      <p className="mt-1 text-tremor-default text-tremor-content dark:text-dark-tremor-content">{name}</p>
    </Card>
  )
}
