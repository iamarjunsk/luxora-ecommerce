import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  // 1. Total Sales (Paid orders)
  const salesResult = await prisma.order.aggregate({
    _sum: {
      total: true
    },
    where: {
      status: 'PAID'
    }
  })
  const totalSales = salesResult._sum.total || 0

  // 2. Counts
  const totalOrders = await prisma.order.count()
  const totalProducts = await prisma.product.count()
  const totalCustomers = await prisma.user.count({
    where: { role: 'USER' }
  })

  // 3. Recent Orders
  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
        user: {
            select: { name: true, email: true }
        }
    }
  })

  // 4. Low Stock Products
  const lowStockProducts = await prisma.product.findMany({
    where: {
      stock: { lt: 5 }
    },
    take: 5,
    orderBy: { stock: 'asc' }
  })

  // 5. Sales Trend (Last 7 Days)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const salesTrendRaw = await prisma.order.groupBy({
    by: ['createdAt'],
    where: {
      createdAt: { gte: sevenDaysAgo },
      status: 'PAID'
    },
    _sum: {
      total: true
    }
  })

  // Process sales trend to group by day
  const salesTrendMap = new Map<string, number>()
  for (let i = 0; i < 7; i++) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    salesTrendMap.set(d.toISOString().split('T')[0], 0)
  }

  salesTrendRaw.forEach(item => {
    const date = item.createdAt.toISOString().split('T')[0]
    if (salesTrendMap.has(date)) {
      salesTrendMap.set(date, (salesTrendMap.get(date) || 0) + (item._sum.total || 0))
    }
  })

  const salesTrend = Array.from(salesTrendMap.entries())
    .map(([date, amount]) => ({ date, amount }))
    .reverse()

  // 6. Visitor Demographics
  const visitorsByCountry = await prisma.visitor.groupBy({
    by: ['country'],
    _count: {
      id: true
    },
    orderBy: {
      _count: {
        id: 'desc'
      }
    },
    take: 5
  })

  const visitorsByCity = await prisma.visitor.groupBy({
    by: ['city'],
    _count: {
      id: true
    },
    orderBy: {
      _count: {
        id: 'desc'
      }
    },
    take: 5
  })

  return {
    totalSales,
    totalOrders,
    totalProducts,
    totalCustomers,
    recentOrders,
    lowStockProducts,
    salesTrend,
    visitorsByCountry,
    visitorsByCity
  }
})
