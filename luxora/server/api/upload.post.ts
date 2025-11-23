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
  const filename = `${Date.now()}-${file.filename}`
  const filePath = join(process.cwd(), 'public', 'uploads', filename)

  await writeFile(filePath, file.data)

  return {
    url: `/uploads/${filename}`,
  }
})
