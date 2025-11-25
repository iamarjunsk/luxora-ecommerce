import { prisma } from '~/server/utils/prisma'
import { categoryCreateSchema } from '~/server/utils/validation'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const result = categoryCreateSchema.safeParse(body)

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: result.error.issues[0].message
    })
  }

  try {
    const category = await prisma.category.create({
      data: {
        name: result.data.name,
        image: result.data.image
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
