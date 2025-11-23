import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const idOrSlug = event.context.params?.id

  if (!idOrSlug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Product ID or Slug is required'
    })
  }

  // Check if it's a number (ID) or string (Slug)
  const isId = !isNaN(Number(idOrSlug))

  const product = await prisma.product.findFirst({
    where: isId ? { id: parseInt(idOrSlug) } : { slug: idOrSlug },
    include: {
      images: true
    }
  })

  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }

  return product
})
