import { CSSProperties, useEffect, useState } from 'react'

import Link from 'next/link'

import { Moon, Sun } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { size } from '@/styles/size'
import { zIdx } from '@/styles/z-index'

const headerStyle: CSSProperties = {
  height: size.headerHeight,
}

export function PageHeader() {
  return (
    <header
      style={headerStyle}
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
      if (!data?.user?.image) {
        setNoImg(true)
      }
    }, 1500)
  }, [data])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-10 h-10 border cursor-pointer">
          <AvatarImage
            src={data?.user?.image || ''}
            referrerPolicy="no-referrer"
          />
          {noImg && <AvatarFallback>KR</AvatarFallback>}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {data?.user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {data?.user?.email || ''}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleSignOut}>로그아웃</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}