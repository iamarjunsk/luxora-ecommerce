import { prisma } from '~/server/utils/prisma'
import { verifyUser } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const user = await verifyUser(event)

  const productId = parseInt(event.context.params?.id as string)

  if (isNaN(productId)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid product ID'
    })
  }

  try {
    await prisma.wishlist.delete({
      where: {
        userId_productId: {
          userId: user.id,
          productId
        }
      }
    })
    return { success: true }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to remove from wishlist'
    })
  }
})
