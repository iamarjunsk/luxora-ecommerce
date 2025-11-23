import crypto from 'crypto'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body

  const generated_signature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex')

  if (generated_signature === razorpay_signature) {
    return { success: true }
  } else {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid signature'
    })
  }
})
