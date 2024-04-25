import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { NavBar } from '@/components/navbar'
import Footer from '@/components/footer'
import { classNames } from '@/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Web Tracker',
  description: 'Web Analytics Tracker'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className="antialiased" lang="en">
      <body className={classNames(inter.className, 'flex flex-col relative min-h-screen max-h-fit')}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
