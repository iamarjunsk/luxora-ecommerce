import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export default defineEventHandler(async (event) => {
  try {
    const form = await readMultipartFormData(event)
    
    if (!form || form.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No file uploaded'
      })
    }

    const file = form[0]
    
    if (!file.filename || !file.data) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid file'
      })
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'categories')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const ext = file.filename.split('.').pop()
    const filename = `${timestamp}.${ext}`
    const filepath = join(uploadsDir, filename)

    // Save file
    await writeFile(filepath, file.data)

    // Return public URL
    return {
      url: `/uploads/categories/${filename}`
    }
  } catch (error) {
    console.error('Upload error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to upload image'
    })
  }
})
