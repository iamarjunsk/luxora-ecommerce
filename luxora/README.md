# Luxora - Premium E-commerce Platform

A full-featured e-commerce platform for luxury jewelry built with Nuxt 3, Prisma, and modern web technologies.

## Features

### Customer Features
- 🛍️ Product browsing with advanced filtering
- 🔍 Search functionality
- 🛒 Shopping cart
- ❤️ Wishlist/Favorites
- 💳 Razorpay payment integration
- ⭐ Product reviews (verified buyers only)
- 📱 Mobile responsive design
- 👤 User authentication and profiles

### Admin Features
- 📊 Real-time analytics dashboard
- 📦 Product management (CRUD)
- 📋 Order management
- ⭐ Featured products
- 💬 Review moderation
- 📈 Sales trend visualization
- 🌍 Visitor demographics

## Tech Stack

- **Framework**: Nuxt 3
- **Database**: Prisma ORM with PostgreSQL (SQLite for development)
- **Authentication**: JWT
- **Payments**: Razorpay
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Icons**: Heroicons

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL (for production)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd luxora
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000`

## Production Deployment

See [DEPLOYMENT.md](/Users/arjunsk/.gemini/antigravity/brain/3de9a0e3-34b1-49d4-b33f-fbec834ecf07/implementation_plan.md) for detailed production deployment instructions.

### Quick Production Build

```bash
# Build for production
npm run build

# Start production server
node .output/server/index.mjs
```

## Project Structure

```
luxora/
├── components/         # Vue components
├── pages/             # Application routes
├── layouts/           # Page layouts
├── server/            # API routes and middleware
│   ├── api/          # API endpoints
│   └── utils/        # Server utilities
├── stores/            # Pinia stores
├── prisma/            # Database schema and migrations
├── public/            # Static assets
└── assets/            # CSS and other assets
```

## Environment Variables

Key environment variables (see `.env.example` for full list):

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT tokens
- `RAZORPAY_KEY_ID` - Razorpay public key
- `RAZORPAY_KEY_SECRET` - Razorpay secret key

## Default Admin Credentials

**Development only** (change in production):
- Email: `admin@luxora.com`
- Password: `admin123`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For support, email support@luxora.com or open an issue in the repository.
