
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const products = await prisma.product.findMany({
    take: 4,
    orderBy: { id: 'asc' }
  })

  for (const product of products) {
    await prisma.product.update({
      where: { id: product.id },
      data: { isFeatured: true }
    })
    console.log(`Marked product ${product.id} as featured`)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
