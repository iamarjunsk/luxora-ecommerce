import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and password are required',
    })
  }

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

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'secret',
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
    },
  }
})
