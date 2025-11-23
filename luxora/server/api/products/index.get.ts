import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: { images: true },
  })
  return products
})
