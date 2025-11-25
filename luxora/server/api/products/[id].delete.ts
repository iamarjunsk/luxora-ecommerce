

import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID required' })
  }

  await prisma.product.delete({
    where: { id: parseInt(id) },
  })

  return { success: true }
})
