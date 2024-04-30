'use client'

import { Button, Dialog, DialogPanel } from '@tremor/react'
import Link from 'next/link'
import { useState } from 'react'

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="z-50 bg-white sticky top-0 inset-x-0 h-16">
      <nav className="relative bg-white">
        <div className="border-b border-gray-200">
          <div className="flex container mx-auto h-16 text-tremor-content-strong dark:text-dark-tremor-content-strong items-center justify-between">
            <div className="ml-4 flex">
              <Link href="/">
                <span>HomePage</span> {/* Envuelve el texto en un elemento para el enlace */}
              </Link>
            </div>
            <div className="px-2">
              <Button
                onClick={handleClick}
                variant="secondary"
                className="md:hidden text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Menú
              </Button>
              {isOpen ? (
                <DialogNav isOpen={isOpen} handleIsOpen={setIsOpen} />
              ) : (
                <ul className="hidden md:flex gap-6 items-center">
                  <li>
                    <Link href="/pricing">Pricing</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact</Link>
                  </li>
                  <li>
                    <Link href="/settings">Settings</Link>
                  </li>
                  <li>
                    <Link href="/signin">Sign in</Link>
                  </li>
                  <li>
                    <Link href="/dashboard">
                      <Button variant="primary">Dashboard</Button>
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

interface DialogNavProps {
  isOpen: boolean
  handleIsOpen: (val: boolean) => void
}

function DialogNav({ isOpen, handleIsOpen }: DialogNavProps) {
  return (
    <Dialog open={isOpen} onClose={() => handleIsOpen(false)} static={true}>
      <DialogPanel>
        <ul className="flex flex-col gap-6 items-center" onClick={() => handleIsOpen(false)}>
          <li>
            <Link href="/pricing">Pricing</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/settings">Settings</Link>
          </li>
          <li>
            <Link href="/signin">Sign in</Link>
          </li>
          <li>
            <Link href="/dashboard">
              <Button variant="primary">Dashboard</Button>
            </Link>
          </li>
        </ul>
      </DialogPanel>
    </Dialog>
  )
}
