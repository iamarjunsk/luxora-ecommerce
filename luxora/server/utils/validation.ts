import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
})

export const productCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().positive('Price must be positive'),
  stock: z.coerce.number().int().nonnegative('Stock must be non-negative'),
  category: z.string().min(1, 'Category is required'),
  images: z.array(z.string().url('Invalid image URL')).optional(),
  isFeatured: z.boolean().optional().default(false)
})

export const productUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  price: z.coerce.number().positive().optional(),
  stock: z.coerce.number().int().nonnegative().optional(),
  category: z.string().min(1).optional(),
  images: z.array(z.string().url()).optional(),
  isFeatured: z.boolean().optional()
})

export const categoryCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  image: z.string().url('Invalid image URL').optional()
})

export const categoryUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  image: z.string().url().optional()
})

export const orderUpdateSchema = z.object({
  deliveryStatus: z.enum(['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED'])
})

export const createOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string().min(1),
    quantity: z.number().int().positive()
  })).min(1, 'Order must contain at least one item'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  zip: z.string().min(1, 'ZIP code is required')
})

export const razorpayOrderCreateSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().optional()
})

export const paymentVerifySchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
  customer: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    address: z.string().min(1),
    city: z.string().min(1),
    zip: z.string().min(1),
    phone: z.string().min(10, 'Phone number is required')
  }),
  items: z.array(z.object({
    productId: z.number().int().positive(),
    quantity: z.number().int().positive(),
    price: z.number().positive()
  })),
  userId: z.number().int().optional().nullable()
})
