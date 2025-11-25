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

  const config = useRuntimeConfig()
  
  if (!config.supabaseUrl || !config.supabaseKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase credentials not configured'
    })
  }

  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(config.supabaseUrl, config.supabaseKey)

  const filename = `${Date.now()}-${file.filename}`
  
  const { data, error } = await supabase
    .storage
    .from('products')
    .upload(filename, file.data, {
      contentType: file.type,
      upsert: false
    })

  if (error) {
    console.error('Supabase upload error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to upload file to storage'
    })
  }

  // Get public URL
  const { data: { publicUrl } } = supabase
    .storage
    .from('products')
    .getPublicUrl(filename)

  return {
    url: publicUrl
  }
})
