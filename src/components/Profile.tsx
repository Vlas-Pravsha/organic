'use client'

import { Button } from '@/components/ui/'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { User } from '@supabase/supabase-js'
import Portal from './common/Portal'

function Profile({ handleSignOut, user }: { handleSignOut: () => void, user: User }) {
  const [isOpen, setIsOpen] = useState(false)

  const userData = [
    {
      id: crypto.randomUUID(),
      fullName: `${user.identities![0].identity_data!.full_name}`,
      email: user.email,
      options: [
        { id: crypto.randomUUID(), text: 'Profile', href: '/profile' },
        { id: crypto.randomUUID(), text: 'DashBoard', href: '/' },
        { id: crypto.randomUUID(), text: 'Settings', href: '/settings' },
      ],
    },
  ]
  
  const toggle = () => setIsOpen(!isOpen)

  return (
    <div className="relative">
      <div className="w-8 h-8">
        <Image
          src="/neil-sims.png"
          alt="Profile"
          className="w-full h-full rounded-full cursor-pointer"
          width={30}
          height={30}
          onClick={toggle}
        />
      </div>
      {isOpen && (
        <Portal>
          <div className="absolute bg-gray-dark rounded-lg mt-2 p-4 right-0 top-12 z-10  border border-opacity-medium min-w-48">
            {userData.map(item => (
              <div key={item.id} className="flex flex-col">
                <h2 className="text-lg font-semibold">{item.fullName}</h2>
                <span className="text-sm text-gray-medium font-semibold mb-2">
                  {item.email}
                </span>
                <div className="border-opacity-medium mb-2" />
                <div className="flex flex-col gap-2">
                  {item.options.map(option => (
                    <Link href={option.href} key={option.id} className="rounded-lg hover:bg-gray-darkest">
                      <div className="text-sm text-gray-medium px-2 py-1 hover:bg-hoverBg rounded-md cursor-pointer">
                        {option.text}
                      </div>
                    </Link>
                  ))}
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-2"
                  onClick={handleSignOut}
                >
                  Log Out
                </Button>
              </div>
            ))}
          </div>
        </Portal>
      )}
    </div>
  )
}

export default Profile
