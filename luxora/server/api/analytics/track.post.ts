import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const headers = getRequestHeaders(event)
  const ip = headers['x-forwarded-for'] || event.node.req.socket.remoteAddress || 'unknown'
  
  // Simple check to prevent duplicate logging for same IP today
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const existingVisit = await prisma.visitor.findFirst({
    where: {
      ip: ip as string,
      createdAt: {
        gte: today
      }
    }
  })

  if (existingVisit) {
    return { status: 'already_tracked' }
  }

  // Fetch location data
  let city = 'Unknown'
  let country = 'Unknown'

  try {
    // Using ip-api.com (free, no key required for non-commercial use)
    // Note: Localhost IPs will fail or return private range info
    
    // For development: If IP is local, use a mock public IP to test geolocation
    let queryIp = ip
    if (ip === '::1' || ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.') || ip === 'unknown') {
        queryIp = '122.172.86.102' // Use the IP provided by user as mock
    }

    const response = await fetch(`https://ipapi.co/${queryIp}/json/`)
    const data = await response.json()
    
    if (data.city && data.country_name) {
      city = data.city
      country = data.country_name
    }
  } catch (e) {
    console.error('Failed to fetch location:', e)
  }

  // Save visitor
  await prisma.visitor.create({
    data: {
      ip: ip as string,
      city,
      country
    }
  })

  return { status: 'tracked', city, country }
})
