import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, description, price, category, stock, images } = body

  // Generate slug
  const slug = name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4)

  if (!name || !price) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
    })
  }

  const product = await prisma.product.create({
    data: {
      name,
      slug,
      description,
      price: parseFloat(price),
      category,
      stock: parseInt(stock),
      images: {
        create: images.map((url: string) => ({ url }))
      }
    },
    include: {
      images: true
    }
  })

  return product
})
