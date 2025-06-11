# Management System Accounting - Backend

Backend API untuk sistem manajemen akuntansi dengan Node.js, Express, dan PostgreSQL.

## 🚀 Quick Start

### Prerequisites
- Node.js v16+ 
- PostgreSQL v12+
- npm atau yarn

### Installation

1. **Clone repository & install dependencies**
   ```powershell
   cd management-system-accounting-be
   npm install
   ```

2. **Setup Environment Variables**
   ```powershell
   copy .env.example .env
   ```
   
   Edit `.env` file dengan konfigurasi database Anda:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=management_system_accounting
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   JWT_SECRET_KEY=your-secret-key
   ```

3. **Setup Database**
   ```powershell
   # Create database
   createdb management_system_accounting
   
   # Run migrations
   npx sequelize-cli db:migrate
   
   # Run seeders (optional - for demo data)
   npx sequelize-cli db:seed:all
   ```

4. **Test Setup**
   ```powershell
   # Test database connection
   node test-db-connection.js
   
   # Run startup checks
   node startup-check.js
   ```

5. **Start Development Server**
   ```powershell
   npm run dev
   ```

Server akan berjalan di `http://localhost:3000`

## 📁 Project Structure

```
controllers/     # Business logic
middleware/      # Authentication & validation
models/         # Database models (Sequelize)
routes/         # API endpoints
migrations/     # Database migrations
seeders/        # Sample data
config/         # Database configuration
```

## 🔐 Authentication

API menggunakan JWT authentication. Endpoints yang dilindungi memerlukan header:
```
Authorization: Bearer <your-jwt-token>
```

### Demo User
- **Username**: `admin`
- **Password**: `admin123`

## 🛠 API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register user (admin only)

### Traffic & Customer
- `GET /api/traffic-and-customer` - Get all data
- `GET /api/traffic-and-customer/by-date?date=YYYY-MM-DD` - Get by date
- `GET /api/traffic-and-customer/dates` - Get available dates
- `POST /api/traffic-and-customer` - Create new data

## 🔧 Development

### Scripts
```powershell
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm test         # Run tests (if configured)
```

### Database Commands
```powershell
# Create new migration
npx sequelize-cli migration:generate --name create-table-name

# Create new seeder
npx sequelize-cli seed:generate --name demo-table-name

# Reset database
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Pastikan PostgreSQL berjalan
   - Cek kredensial database di `.env`
   - Jalankan `node test-db-connection.js`

2. **Migration Error** 
   - Pastikan database exists
   - Cek permission user database

3. **JWT Error**
   - Pastikan `JWT_SECRET_KEY` di `.env`
   - Cek format Authorization header

### Logs
- Server logs tersedia di console
- Error details dicatat untuk debugging

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DB_HOST` | Database host | ✅ |
| `DB_PORT` | Database port | ❌ (default: 5432) |
| `DB_NAME` | Database name | ✅ |
| `DB_USERNAME` | Database user | ✅ |
| `DB_PASSWORD` | Database password | ❌ |
| `JWT_SECRET_KEY` | JWT secret key | ✅ |
| `PORT` | Server port | ❌ (default: 3000) |
| `NODE_ENV` | Environment | ❌ (default: development) |

## 🔒 Security

- JWT token expires in 24 hours
- Passwords di-hash dengan bcrypt
- CORS configured untuk frontend
- Input validation pada endpoints

---

**Tech Stack**: Node.js, Express, PostgreSQL, Sequelize, JWT, bcrypt