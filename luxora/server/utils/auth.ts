import jwt from 'jsonwebtoken'
import { prisma } from '~/server/utils/prisma'
import type { H3Event } from 'h3'

export interface JwtPayload {
  id: number
  email: string
  role: string
  iat?: number
  exp?: number
}

export const verifyAdmin = async (event: H3Event) => {
  const token = getCookie(event, 'auth_token')

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: No token provided',
    })
  }

  try {
    const config = useRuntimeConfig()
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload

    if (decoded.role !== 'ADMIN') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden: Admin access required',
      })
    }

    // Check if user still exists in DB and is still admin
    const user = await prisma.user.findUnique({ where: { id: decoded.id } })
    
    if (!user || user.role !== 'ADMIN') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden: Admin access revoked or user not found',
      })
    }

    return decoded
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'statusCode' in error) {
        throw error
    }
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: Invalid token',
    })
  }
}
