import jwt from 'jsonwebtoken'

export default defineEventHandler((event) => {
  const token = getCookie(event, 'auth_token')

  if (!token) {
    return { user: null }
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    return { user: decoded }
  } catch (error) {
    return { user: null }
  }
})
