import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, description, price, images, category, stock } = body

  if (!name || !price) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
    })
  }

  const product = await prisma.product.create({
    data: {
      name,
      description: description || '',
      price: parseFloat(price),
      category: category || 'General',
      stock: parseInt(stock) || 0,
      images: {
        create: images && Array.isArray(images) ? images.map((url: string) => ({ url })) : []
      }
    },
    include: {
      images: true
    }
  })

  return product
})
