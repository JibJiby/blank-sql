import Head from 'next/head'
import Link from 'next/link'

import { motion } from 'framer-motion'

import { buttonVariants } from '@/components/ui/button'
import TypographyH1 from '@/components/ui/typography/h1'
import TypographyH3 from '@/components/ui/typography/h3'

import { cn } from '@/lib/utils'

const MAIN_COPYWRITING = 'SQL 쉽게 배우고 싶으세요?'
const SUB_COPYWRITING_01 = '어려운 용어 ❌'
const SUB_COPYWRITING_02 = '필요한 개념만 🟢'

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>소개 페이지</title>
      </Head>
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col justify-center space-y-8 select-none">
          <CopyWriting />
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
    </>
  )
}

function CopyWriting() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <TypographyH1>{MAIN_COPYWRITING}</TypographyH1>
      </motion.div>
      <TypographyH3 className="space-y-2 tracking-wide text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {SUB_COPYWRITING_01}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {SUB_COPYWRITING_02}
        </motion.div>
      </TypographyH3>
    </>
  )
}
