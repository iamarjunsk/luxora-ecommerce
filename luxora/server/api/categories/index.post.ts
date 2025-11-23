import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name is required'
    })
  }

  try {
    const category = await prisma.category.create({
      data: {
        name: body.name,
        image: body.image
      }
    })
    return category
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create category'
    })
  }
})
