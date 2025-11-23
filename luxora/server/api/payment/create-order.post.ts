import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { amount, currency = 'INR' } = body

  if (!amount) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Amount is required'
    })
  }

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
