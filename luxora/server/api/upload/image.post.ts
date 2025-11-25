import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export default defineEventHandler(async (event) => {
  await verifyAdmin(event)
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

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!file.type || !allowedTypes.includes(file.type)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.'
      })
    }

    // Get folder from query param or default to 'general'
    const query = getQuery(event)
    const folder = (query.folder as string) || 'general'
    
    // Validate folder name to prevent directory traversal
    if (!/^[a-zA-Z0-9-_]+$/.test(folder)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid folder name'
      })
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads', folder)
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
      url: `/uploads/${folder}/${filename}`
    }
  } catch (error: any) {
    console.error('Upload error:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to upload image'
    })
  }
})
