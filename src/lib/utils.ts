export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
export const valueFormatter = (number: number) => `${Intl.NumberFormat('es-ES').format(number).toString()}`
