### ✅ README.md
---

Zenya - E-Learning Platform

A simple Node.js + PostgreSQL + React-based E-Learning Platform offering courses and stats, with a login system for Admins, Students, and Faculty with secure password hashing using bcrypt.

---


## 🛠️ Tech Stack

- Backend: Node.js, Express.js, PostgreSQL
- Frontend: React.js
- Security: bcryptjs
- Database Driver: pg

---
## 📁 Project Structure
```

/backend
  ├── routes
  │    ├── admin.js
  │    ├── faculty.js
  │    └── student.js
  ├── config
  │    └── db.js
  └── index.js

/frontend
  ├── src
  │    ├── AdminSignup.jsx
  │    ├── FacultyLogin.jsx
  │    └── StudentLogin.jsx
  └── App.js


```
---
## 🚀 Getting Started


### 1. Clone the repository

```bash
git clone https://github.com/your-username/Zenya.git
cd Zenya
```

> Replace `your-username` with your GitHub username.

---

### 2. Set up the backend

```bash
cd backend
npm install
```

#### 👉 Create a `.env` file

```env
PORT=5000
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=your_db_name
DB_PASSWORD=your_password
DB_PORT=5432
```

#### 👉 Run backend

```bash
node index.js
```

---

### 3. Set up the frontend

```bash
cd ../frontend
npm install
```

#### 👉 Run frontend

```bash
npm start
```

---

## 🔁 Git Commands (For Collaboration)

### ✅ First Time Setup

```bash
git init
git remote add origin https://github.com/your-username/Zenya.git
```

### 📤 Push your code

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 📥 Pull latest changes

```bash
git pull origin main
```

---

## ✅ Routes

### Admin Signup
```
POST /admin/signin
```

### Faculty Login
```
POST /faculty/login
```

### Student Login
```
POST /student/login
```

---

## 🔐 Security

- Passwords are hashed using `bcryptjs`
- Sensitive environment variables are stored in `.env`

---

## 👨‍💻 Contributors

- [@Rishi-dev-afk](https://github.com/Rishi-dev-afk)
- [@Dibya](https://github.com/Dibyajyoti1515)
- [@Misbah](https://github.com/pinkman)
- [@Sudeep](https://github.com/dashsudeep)

---
## 📄 License

This project is licensed under the MIT License.

---
