import Link from 'next/link'

import { motion } from 'framer-motion'

import { Button, buttonVariants } from '@/components/ui/button'
import TypographyH1 from '@/components/ui/typography/h1'

import { cn } from '@/lib/utils'

const MAIN_COPYWRIGHTING = 'SQL 쉽게 배우고 싶으세요?'
// const MAIN_COPYWRIGHTING = '___ SQL'

export default function AboutPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col justify-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <TypographyH1 className="select-none">
            {MAIN_COPYWRIGHTING}
          </TypographyH1>
        </motion.div>
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: 'outline' }), 'text-md')}
          >
            로그인 하러 가기
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
