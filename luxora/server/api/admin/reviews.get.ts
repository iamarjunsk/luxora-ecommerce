import { prisma } from '~/server/utils/prisma'
import { verifyAdmin } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await verifyAdmin(event)

  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        product: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return reviews
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch reviews'
    })
  }
})
