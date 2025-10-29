# VibeCommerce Backend (ready)

## Quick Start

1. Copy `.env.example` to `.env` and update `MONGO_URI` with your Atlas connection string.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Seed sample products (runs once):
   ```bash
   npm run seed
   ```
4. Start server in dev mode:
   ```bash
   npm run dev
   ```

API Endpoints:
- GET /api/products
- GET /api/products/:id
- POST /api/products
- GET /api/cart?userId=USER_ID
- POST /api/cart  { userId, productId, qty }
- PUT /api/cart/:id  { userId, qty }
- DELETE /api/cart/:id?userId=USER_ID
- POST /api/checkout  { userId, name, email, address, phone }
