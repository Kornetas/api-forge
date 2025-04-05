# Express API – Products + Auth + JWT 🔐

Simple Node.js + Express API with user authentication, JWT, roles (admin/user), and CRUD for products.

## 🔧 Tech Stack

- Node.js
- Express
- MongoDB
- JWT
- Bcrypt
- Jest + Supertest

## 🚀 Features

- User registration and login
- Password hashing with bcrypt
- JWT token authentication
- Role system (admin, user)
- Auth middleware
- Role middleware (for example: only admin can add products)
- Product CRUD (Create, Read, Update, Delete)
- Authorization: only product owner or admin can edit/delete

## 📁 Folder Structure

```
/controllers     → logic for auth and products
/routes          → API endpoints
/models          → Mongoose schemas
/middleware      → auth and role checks
/tests           → basic auth + product tests
app.js           → express app setup
server.js        → DB connection + app start
```

## 🧪 Basic Test Example

```
npm test
```

- Runs Jest tests for auth and products
- Uses test database (`api-test`, `api-test-products`)

## 🛠 How to Run

1. Clone the repo
2. Install packages:

```
npm install
```

3. Create `.env` file:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/api-forge
JWT_SECRET=yourSecretKeyHere
```

4. Start server:

```
npm run dev
```

---

## 🔐 Example Routes

### Auth:

- `POST /api/auth/register` – register user
- `POST /api/auth/login` – login and get token

### Products:

- `GET /api/products` – public
- `POST /api/products` – admin only
- `PUT /api/products/:id` – owner or admin
- `DELETE /api/products/:id` – owner or admin

Add token in header:

```
Authorization: Bearer your_token_here
```

---
