import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const email = 'user@luxora.com'
  const password = 'user123'

  console.log(`Checking credentials for: ${email}`)

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    console.log('User NOT found in database.')
    return
  }

  console.log('User found:', { id: user.id, email: user.email, role: user.role, passwordHash: user.password })

  const isValid = await bcrypt.compare(password, user.password)

  if (isValid) {
    console.log('✅ Password MATCHES!')
  } else {
    console.log('❌ Password does NOT match.')
    
    // Debug: Hash the password again to see what it should be
    const newHash = await bcrypt.hash(password, 10)
    console.log('New hash for "user123":', newHash)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
