
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const featured = query.featured === 'true'
  const limit = query.limit ? parseInt(query.limit as string) : undefined
  const category = query.category as string
  const search = query.search as string

  const where: any = {}
  
  if (featured) {
    where.isFeatured = true
  }
  
  if (category) {
    where.category = category
  }

  if (search) {
    where.OR = [
      { name: { contains: search } }, // Case-insensitive by default in SQLite? No, usually case-sensitive.
      { description: { contains: search } }
    ]
  }

  const products = await prisma.product.findMany({
    where,
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: { images: true },
  })
  
  return products
})
