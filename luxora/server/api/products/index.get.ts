

import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: { images: true },
  })
  return products
})
