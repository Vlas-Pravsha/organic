'use client'

import { signOut } from '@/app/auth/actions'
import { Button } from '@/components/ui/'
import { useTheme } from '@/contexts/'

import { useUser } from '@/hooks/'
import { Loader2, LogIn, Menu, Moon, Search, Sun } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'
import Profile from '../Profile'

function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  const { theme, toggleTheme } = useTheme()
  const { user, setUser, loading } = useUser()

  const handleToggleTheme = () => {
    toggleTheme()
  }

  const handleSignOut = async () => {
    await signOut()
    setUser(null)
  }

  return (
    <div className="bg-gray-darkest fixed top-0 left-0 right-0 z-10 border-b border-opacity-medium">
      <div className="flex items-center justify-between p-3 px-6 mx-auto">
        <div className="flex items-center gap-8">
          <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-dark">
            <Menu className="w-6 h-6 text-gray-mediumIcon" />
          </button>
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="Icon"
                className="w-8 h-8"
                width="30"
                height="30"
              />
              <h2 className="text-2xl font-bold">DashBoard</h2>
            </div>
          </Link>
          <div className="flex items-center border border-opacity-medium bg-gray-dark rounded-lg px-2 py-1">
            <Search className="w-5 h-5 text-gray-mediumIcon mr-3" />
            <input
              type="text"
              className="bg-gray-dark text-gray-medium placeholder:text-gray-medium outline-none w-64"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={handleToggleTheme} className="p-2 rounded-lg hover:bg-gray-dark">
            {theme === 'dark'
              ? <Sun className="w-6 h-6 text-gray-mediumIcon" />
              : <Moon className="w-6 h-6 text-gray-mediumIcon" />}
          </button>
          {loading
            ? <Loader2 className="w-8 h-8 animate-spin" />
            : user
              ? <Profile handleSignOut={handleSignOut} user={user} />
              : (
                  <Link href="/auth/sign-up">
                    <Button variant="primary" size="sm" iconBefore={<LogIn />}>
                      Login/Register
                    </Button>
                  </Link>
                )}
        </div>
      </div>
    </div>
  )
}

export default Header
