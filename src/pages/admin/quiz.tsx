import { GetServerSideProps } from 'next'

import { getServerSession } from 'next-auth'
import { container } from 'tsyringe'

import { authOptions } from '@/lib/auth'

import { UserService } from '@/server/services/user.service'

export default function QuizAdminPage() {
  return 'QuizAdminPage'
}

export const getServerSideProps = (async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (session?.user) {
    const userService = container.resolve(UserService)
    const role = await userService.getRole(session?.user.id)

    if (role === 'Admin') {
      return { props: {} }
    }
  }

  return {
    props: {},
    redirect: {
      destination: '/',
    },
  }
}) satisfies GetServerSideProps<{}>
