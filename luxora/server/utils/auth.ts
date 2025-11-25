import jwt from 'jsonwebtoken'
import { prisma } from '~/server/utils/prisma'

export const verifyAdmin = async (event: any) => {
  const token = getCookie(event, 'auth_token')

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: No token provided',
    })
  }

  try {
    const config = useRuntimeConfig()
    const decoded = jwt.verify(token, config.jwtSecret) as any

    if (decoded.role !== 'ADMIN') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden: Admin access required',
      })
    }

    // Optional: Check if user still exists in DB and is still admin
    // const user = await prisma.user.findUnique({ where: { id: decoded.id } })
    // if (!user || user.role !== 'ADMIN') { ... }

    return decoded
  } catch (error: any) {
    if (error.statusCode) throw error
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: Invalid token',
    })
  }
}
