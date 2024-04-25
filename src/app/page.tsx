import { classNames } from '@/utils'
import { Button, Callout, Card, Divider, Title } from '@tremor/react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="container flex justify-center mx-auto my-8 xl:my-20">
      <div className="flex flex-col xl:flex-row gap-12 xl:justify-between mx-auto p-8">
        <div className="relative flex flex-col gap-4 max-w-2xl">
          <h1
            className={classNames(
              'text-5xl tremor-content-strong font-extrabold md:text-6xl lg:text-5xl text-zinc-900'
            )}
          >
            Website Analytics Tracker
          </h1>
          <p className="max-w-prose text-zinc-600 font-normal sm:text-lg">
            Gain insights into your website traffic, visitor demographics, and track custom events.
          </p>{' '}
          {/* Rephrased for better clarity and flow */}
          <div className="mt-5">
            <Link href="/dashboard">
              <Button variant="primary">Access Dashboard</Button>
            </Link>
          </div>
        </div>
        <div>
          <Callout title="Disclaimer" color="teal" className="xl:max-w-md max-h-fit">
            This website is a demonstration of analytics capabilities. Functionality beyond the dashboard is not
            implemented. Feel free to explore and interact to see the results reflected in the dashboard.
          </Callout>
        </div>
      </div>
    </main>
  )
}
