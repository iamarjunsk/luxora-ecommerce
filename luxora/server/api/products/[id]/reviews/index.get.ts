import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const productId = parseInt(event.context.params?.id as string)

  if (isNaN(productId)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid product ID'
    })
  }

  try {
    const reviews = await prisma.review.findMany({
      where: {
        productId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Calculate average rating
    const averageRating = reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0

    return {
      reviews,
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
      totalReviews: reviews.length
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch reviews'
    })
  }
})
