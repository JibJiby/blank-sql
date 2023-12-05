/* eslint-disable react-hooks/rules-of-hooks */
import { CSSProperties, PropsWithChildren, useEffect, useState } from 'react'

import Link from 'next/link'

import { AlignJustify, Moon, Sun } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { cn } from '@/lib/utils'

import { size } from '@/styles/size'
import { zIdx } from '@/styles/z-index'

const headerStyle: CSSProperties = {
  height: size.headerHeight,
}

const menuList = [
  { href: '/single', text: '하나씩 풀기' },
  { href: '/chapter', text: '챕터별 풀기' },
]

export function PageHeader() {
  return (
    <header
      style={headerStyle}
      className={`fixed z-${zIdx.header} top-0 w-full flex justify-between py-4 pl-8 pr-4 bg-background`}
    >
      <div className="flex items-center w-full h-full font-bold gap-x-4">
        <Link href="/">_____SQL</Link>
        <nav className="flex justify-center ml-4 font-normal max-sm:hidden gap-x-6">
          {menuList.map((menu) => (
            <PageHeader.NavItem
              key={menu.href}
              href={menu.href}
              text={menu.text}
            />
          ))}
        </nav>
      </div>
      <div className="flex gap-x-4">
        <PageHeader.ThemeSwitch />
        <PageHeader.UserNav />
        <PageHeader.Menu className="sm:hidden" />
      </div>
    </header>
  )
}

function _HeaderNavItem({
  href,
  text,
  className,
}: PropsWithChildren<{ href: string; text: string; className?: string }>) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'opacity-60 hover:opacity-100 m-0',
        className
      )}
    >
      {text}
    </Link>
  )
}
PageHeader.NavItem = _HeaderNavItem

// ref : https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
function _ThemeSwitch() {
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
      <DropdownMenuTrigger asChild className="max-sm:hidden">
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
PageHeader.ThemeSwitch = _ThemeSwitch

function _UserNav() {
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
PageHeader.UserNav = _UserNav

function _Menu({ className }: { className?: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div
          className={cn(
            'flex items-center justify-center cursor-pointer w-10 h-10',
            className
          )}
        >
          <Button
            variant="ghost"
            size="icon"
            className="opacity-75 hover:opacity-100"
          >
            <AlignJustify strokeWidth={2.4} size={20} />
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent className="w-[45%]">
        <SheetHeader>
          <SheetTitle>메뉴</SheetTitle>
          <SheetDescription>
            {menuList.map((menu) => (
              <PageHeader.NavItem
                className="w-full"
                key={menu.href}
                href={menu.href}
                text={menu.text}
              />
            ))}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
PageHeader.Menu = _Menu
