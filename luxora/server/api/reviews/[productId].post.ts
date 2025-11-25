import { prisma } from '~/server/utils/prisma'
import { verifyUser } from '~/server/utils/auth'
import { z } from 'zod'

const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(10, 'Comment must be at least 10 characters')
})

export default defineEventHandler(async (event) => {
  const user = await verifyUser(event)
  const productId = parseInt(event.context.params?.productId as string)

  if (isNaN(productId)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid product ID'
    })
  }

  const body = await readBody(event)
  const result = reviewSchema.safeParse(body)

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: result.error.issues[0].message
    })
  }

  const { rating, comment } = result.data

  try {
    // Check if user has purchased this product
    const hasPurchased = await prisma.order.count({
      where: {
        userId: user.id,
        status: 'PAID',
        items: {
          some: {
            productId
          }
        }
      }
    })

    if (hasPurchased === 0) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Only verified buyers can leave reviews'
      })
    }

    // Create or update review
    const review = await prisma.review.upsert({
      where: {
        userId_productId: {
          userId: user.id,
          productId
        }
      },
      update: {
        rating,
        comment,
        updatedAt: new Date()
      },
      create: {
        userId: user.id,
        productId,
        rating,
        comment
      },
      include: {
        user: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return review
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create review'
    })
  }
})
