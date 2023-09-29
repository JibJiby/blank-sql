import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({})

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/',
    // '/(api|trpc)(.*)',
    // // https://nextjs.org/docs/messages/invalid-route-source
    '/api/((?!webhook).*)',
  ],
}
