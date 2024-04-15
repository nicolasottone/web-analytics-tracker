import { Button, Card, Divider, Title } from '@tremor/react'
import Link from 'next/link'

export default function Contact() {
  return (
    <main className="container mx-auto my-20">
      <Card className="flex flex-col gap-5">
        <Title>Contact</Title>
        <h2 className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Testing buttons to track analytics
        </h2>
        <Divider />
        <div className="flex justify-around">
          <Link href={'/'}>
            <Button variant="secondary">Go to Home Page</Button>
          </Link>

          <Link href={'/pricing'}>
            <Button variant="secondary">Go to /pricing</Button>
          </Link>
          <Link href={'/dashboard'}>
            <Button variant="primary">Go to /dashboard</Button>
          </Link>
        </div>
      </Card>
    </main>
  )
}
