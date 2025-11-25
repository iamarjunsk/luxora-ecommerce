import { prisma } from '~/server/utils/prisma'
import { orderUpdateSchema } from '~/server/utils/validation'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  const body = await readBody(event)

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Order ID is required' })
  }

  const result = orderUpdateSchema.safeParse(body)

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: result.error.issues[0].message
    })
  }

  const { deliveryStatus } = result.data

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
