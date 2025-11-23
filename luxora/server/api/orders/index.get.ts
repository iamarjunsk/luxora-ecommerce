import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })
    return orders
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch orders'
    })
  }
})
