import { PrismaClient } from '@prisma/client'
import { container } from 'tsyringe'

import { prisma } from '@/server/services/db/prisma.implementation'

container.register<PrismaClient>('PrismaClient', {
  useValue: prisma,
})
