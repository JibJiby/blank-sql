import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import { QuizEditForm } from '@/components/admin/quiz-edit-form'

import { auth } from '@/lib/auth'

import BaseLayout from '@/layouts/base-layout'
import { userService } from '@/server/services'

export default function QuizAdminWritePage({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <BaseLayout>
      <QuizEditForm quizId={id} />
    </BaseLayout>
  )
}

export const getServerSideProps = (async (context) => {
  const session = await auth(context.req, context.res)

  if (session?.user) {
    const role = await userService.getRole(session?.user.id)

    if (role !== 'Admin') {
      return {
        props: {},
        redirect: {
          destination: '/',
        },
      }
    }
  }

  const { id } = context.query as Record<string, string>

  return {
    props: {
      id: id || '',
    },
  }
}) satisfies GetServerSideProps<{ id?: string }>
