import Link from 'next/link'
import { RiLink } from '@remixicon/react'

export default function Footer() {
  return (
    <footer className="container flex flex-col mx-auto xl:absolute w-full inset-x-0 bottom-0">
      <div className="py-6 md:pt-16">
        <hr className="my-2 text-muted-foreground sm:mx-auto " />
        <div className="flex gap-2 flex-col md:flex-row items-center sm:justify-between text-sm text-muted-foreground sm:text-center">
          <span>
            {new Date().getFullYear()} Web Analytics Tracker. by{' '}
            <Link href={'https://github.com/nicolasottone'}>Nicolas Ottone</Link>
          </span>
          <span>
            <RiLink className="inline mr-2 text-xs h-5 w-5" />
            <Link href={'https://github.com/nicolasottone/web-analytics-tracker'}>View GitHub Repository</Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
