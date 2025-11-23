import crypto from 'crypto'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customer, items } = body

  const generated_signature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex')

  if (generated_signature === razorpay_signature) {
    // Save order to database
    try {
        const total = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)

        const order = await prisma.order.create({
            data: {
                paymentId: razorpay_payment_id,
                total,
                status: 'PAID',
                customerName: `${customer.firstName} ${customer.lastName}`,
                customerEmail: customer.email,
                customerAddress: customer.address,
                customerCity: customer.city,
                customerZip: customer.zip,
                items: {
                    create: items.map((item: any) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            }
        })
        return { success: true, orderId: order.id }
    } catch (error) {
        console.error('Failed to save order:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Payment verified but failed to save order'
        })
    }
  } else {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid signature'
    })
  }
})
