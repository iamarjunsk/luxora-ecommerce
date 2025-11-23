import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token')

  if (!token) {
    return { user: null }
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        address: true,
        city: true,
        zip: true
      }
    })

    return { user }
  } catch (error) {
    return { user: null }
  }
})
