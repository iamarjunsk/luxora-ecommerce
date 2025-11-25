import { prisma } from '~/server/utils/prisma'
import { categoryUpdateSchema } from '~/server/utils/validation'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  const body = await readBody(event)

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID is required'
    })
  }

  const result = categoryUpdateSchema.safeParse(body)

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: result.error.issues[0].message
    })
  }

  try {
    const category = await prisma.category.update({
      where: {
        id: parseInt(id)
      },
      data: {
        name: result.data.name,
        image: result.data.image
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
