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
            changeType === 'positive' ? 'text-emerald-700 dark:text-emerald-500' : 'text-red-700 dark:text-red-500',
            'text-tremor-default font-medium'
          )}
        >
          {change}
        </span>
      </p>
      <p className="mt-1 text-tremor-default text-tremor-content dark:text-dark-tremor-content">{name}</p>
    </Card>
  )
}
