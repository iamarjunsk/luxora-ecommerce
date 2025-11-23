import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID is required'
    })
  }

  try {
    await prisma.category.delete({
      where: {
        id: parseInt(id)
      }
    })
    return { success: true }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete category'
    })
  }
})
