import { writeFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const files = await readMultipartFormData(event)

  if (!files || files.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No file uploaded',
    })
  }

  const file = files[0]

  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  if (!file.type || !allowedTypes.includes(file.type)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.'
    })
  }

  const filename = `${Date.now()}-${file.filename}`
  const filePath = join(process.cwd(), 'public', 'uploads', filename)

  await writeFile(filePath, file.data)

  return {
    url: `/uploads/${filename}`,
  }
})
