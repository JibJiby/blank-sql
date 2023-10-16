import { useEffect, useState } from 'react'

import Link from 'next/link'

import { Moon, Sun } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { size } from '@/styles/size'
import { zIdx } from '@/styles/z-index'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export function PageHeader() {
  return (
    <header
      style={{
        height: size.headerHeight,
      }}
      className={`fixed z-${zIdx.header} top-0 w-full  flex justify-between py-4 px-8`}
    >
      <div className="flex items-center justify-between w-full h-full font-bold">
        <Link href="/">_____SQL</Link>
      </div>
      <div className="flex space-x-4">
        <ThemeSwitch />
        <UserNav />
      </div>
    </header>
  )
}

// ref : https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function UserNav() {
  const [noImg, setNoImg] = useState(false)
  const { data } = useSession()

  const handleSignOut = (e: Event) => {
    e.preventDefault()
    signOut({
      callbackUrl: `${window.location.origin}/about`,
    })
  }

  useEffect(() => {
    setTimeout(() => {
      setNoImg(true)
    }, 1500)
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-10 h-10 cursor-pointer">
          <AvatarImage
            src={data?.user?.image || ''}
            referrerPolicy="no-referrer"
          />
          {noImg && <AvatarFallback>KR</AvatarFallback>}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={handleSignOut}>로그아웃</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
