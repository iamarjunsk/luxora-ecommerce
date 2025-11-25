

import { prisma } from '~/server/utils/prisma'
import { productCreateSchema } from '~/server/utils/validation'

export default defineEventHandler(async (event) => {
  await verifyAdmin(event)
  const body = await readBody(event)
  const result = productCreateSchema.safeParse(body)

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: result.error.issues[0].message,
    })
  }

  const { name, description, price, category, stock, images } = result.data

  // Generate slug
  const slug = name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4)

  const product = await prisma.product.create({
    data: {
      name,
      slug,
      description,
      price,
      category,
      stock,
      images: {
        create: images?.map((url: string) => ({ url })) || []
      }
    },
    include: {
      images: true
    }
  })

  return product
})
