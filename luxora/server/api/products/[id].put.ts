

import { prisma } from '~/server/utils/prisma'
import { productUpdateSchema } from '~/server/utils/validation'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  const body = await readBody(event)
  
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID required' })
  }

  const result = productUpdateSchema.safeParse(body)

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: result.error.issues[0].message,
    })
  }

  const { name, description, price, images, category, stock, isFeatured } = result.data

  // Transaction to update product and replace images
  const product = await prisma.$transaction(async (tx) => {
    // 1. Update basic fields
    const updatedProduct = await tx.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        price,
        category,
        stock,
        isFeatured,
      },
    })

    // 2. Handle images if provided
    if (images && Array.isArray(images)) {
      // Delete existing images
      await tx.productImage.deleteMany({
        where: { productId: parseInt(id) },
      })

      // Create new images
      if (images.length > 0) {
        await tx.productImage.createMany({
          data: images.map((url: string) => ({
            url,
            productId: parseInt(id),
          })),
        })
      }
    }

    return updatedProduct
  })

  return product
})
