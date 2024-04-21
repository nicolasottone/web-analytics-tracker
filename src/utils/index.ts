import { format, subDays } from 'date-fns'

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
export const valueFormatter = (number: number) => `${Intl.NumberFormat('es-ES').format(number).toString()}`

export const getDate = (sub: number = 0) => {
  const date = subDays(new Date(), sub)
  return format(date, 'dd/MM/yyyy')
}
