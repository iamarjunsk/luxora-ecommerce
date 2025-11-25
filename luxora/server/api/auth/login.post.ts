import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '~/server/utils/prisma'

import { loginSchema } from '~/server/utils/validation'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const result = loginSchema.safeParse(body)

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: result.error.issues[0].message,
    })
  }

  const { email, password } = result.data

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    console.log('Login failed: User not found', email)
    throw createError({
      statusCode: 401,
      statusMessage: 'User not found',
    })
  }

  const isValid = await bcrypt.compare(password, user.password)

  if (!isValid) {
    console.log('Login failed: Password mismatch', email)
    throw createError({
      statusCode: 401,
      statusMessage: 'Password mismatch',
    })
  }

  const config = useRuntimeConfig()
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    config.jwtSecret,
    { expiresIn: '1d' }
  )

  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
  })

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      address: user.address,
      city: user.city,
      zip: user.zip,
    },
  }
})
