import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 10)
  const userPassword = await bcrypt.hash('user123', 10)

  // Create Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@luxora.com' },
    update: {
      password: adminPassword,
      role: 'ADMIN'
    },
    create: {
      email: 'admin@luxora.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN'
    }
  })

  // Create User
  const user = await prisma.user.upsert({
    where: { email: 'user@luxora.com' },
    update: {
      password: userPassword,
      role: 'USER'
    },
    create: {
      email: 'user@luxora.com',
      name: 'Demo User',
      password: userPassword,
      role: 'USER'
    }
  })

  console.log({ admin, user })
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
