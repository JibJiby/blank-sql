import { PrismaClient } from '@prisma/client'

// ref) https://github.com/prisma/prisma/issues/13884
export const prisma: PrismaClient = new PrismaClient()
