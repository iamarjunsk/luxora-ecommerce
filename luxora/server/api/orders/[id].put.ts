import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  const body = await readBody(event)
  const { deliveryStatus } = body

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Order ID is required' })
  }

  try {
    const order = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { deliveryStatus }
    })
    return order
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update order status'
    })
  }
})
