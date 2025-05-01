## ✨ Features

- RESTful API for policy management

- Database integration

- API documentation

## 🛠 Technologies

- TypeScript

- Express.js

- PostgreSQL

## 📋 API Endpoints

| Method | Endpoint            | Description       |
| ------ | ------------------- | ----------------- |
| GET    | `/api/policies`     | Get all policies  |
| POST   | `/api/policies`     | Create new policy |
| PUT    | `/api/policies/:id` | Update policy     |
| DELETE | `/api/policies/:id` | Delete policy     |

## 🗃 Database Configuration

**Database Name:** `tob_db`

#### `policies` table:

```sql
CREATE TABLE policies (
  id SERIAL PRIMARY KEY,
  policy_number VARCHAR(100) UNIQUE NOT NULL,
  insured_name VARCHAR(100) NOT NULL,
  effective_date DATE NOT NULL,
  expiry_date DATE NOT NULL,
  vehicle_brand VARCHAR(100) NOT NULL,
  vehicle_type VARCHAR(50) NOT NULL,
  vehicle_year INT NOT NULL,
  vehicle_price NUMERIC(15, 2) NOT NULL,
  premium_rate NUMERIC(5, 2) NOT NULL,
  premium_price NUMERIC(15, 2)
);
```

## 🏃‍♂️ Running Locally

1. Install PostgreSQL, create database and create table:

   ```bash
   Database: tob_db
   Table: policies
   ```

2. Clone this repository to your local machine using:

   ```bash
   git clone https://github.com/Gerardusdavidbayuaji/tob-ins.git
   cd /backend
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
5. Access the application in your browser at http://localhost:3000.
