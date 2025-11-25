import { prisma } from '~/server/utils/prisma'
import { verifyUser } from '~/server/utils/auth'
import { z } from 'zod'

const addToWishlistSchema = z.object({
  productId: z.number().int().positive()
})

export default defineEventHandler(async (event) => {
  const user = await verifyUser(event)

  const body = await readBody(event)
  const result = addToWishlistSchema.safeParse(body)

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid input'
    })
  }

  const { productId } = result.data

  try {
    // Check if already exists
    const existing = await prisma.wishlist.findUnique({
      where: {
        userId_productId: {
          userId: user.id,
          productId
        }
      }
    })

    if (existing) {
      return existing
    }

    const wishlistItem = await prisma.wishlist.create({
      data: {
        userId: user.id,
        productId
      }
    })
    return wishlistItem
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to add to wishlist'
    })
  }
})
