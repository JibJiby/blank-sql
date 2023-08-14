import { useQuery } from '@tanstack/react-query'

import { Quiz } from '@/models/quiz'

export const useSingleQuizQuery = (quizId: string) => {
  const query = useQuery<Quiz>({
    queryKey: ['quizzes', quizId],
    queryFn: async () => {
      const res = await fetch(`/api/quiz/${quizId}`)
      return res.json()
    },
    initialData: undefined,
  })

  return query
}
