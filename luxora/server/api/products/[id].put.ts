import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  const body = await readBody(event)
  const { name, description, price, images, category, stock } = body

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID required' })
  }

  // Transaction to update product and replace images
  const product = await prisma.$transaction(async (tx) => {
    // 1. Update basic fields
    const updatedProduct = await tx.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        stock: parseInt(stock),
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
