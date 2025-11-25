import { prisma } from '~/server/utils/prisma'
import { verifyUser } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const user = await verifyUser(event)

  try {
    const wishlist = await prisma.wishlist.findMany({
      where: {
        userId: user.id
      },
      include: {
        product: {
          include: {
            images: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return wishlist
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch wishlist'
    })
  }
})
