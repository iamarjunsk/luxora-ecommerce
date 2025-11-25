import Razorpay from 'razorpay'
import { razorpayOrderCreateSchema } from '~/server/utils/validation'

const config = useRuntimeConfig()

const razorpay = new Razorpay({
  key_id: config.public.razorpayKeyId,
  key_secret: config.razorpayKeySecret
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const result = razorpayOrderCreateSchema.safeParse(body)

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: result.error.issues[0].message
    })
  }

  const { amount, currency = 'INR' } = result.data

  const options = {
    amount: Math.round(amount * 100), // amount in the smallest currency unit
    currency,
    receipt: `receipt_${Date.now()}`
  }

  try {
    const order = await razorpay.orders.create(options)
    return order
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create Razorpay order'
    })
  }
})
