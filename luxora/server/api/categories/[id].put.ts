import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  const body = await readBody(event)

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID is required'
    })
  }

  if (!body.name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name is required'
    })
  }

  try {
    const category = await prisma.category.update({
      where: {
        id: parseInt(id)
      },
      data: {
        name: body.name,
        image: body.image
      }
    })
    return category
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update category'
    })
  }
})
