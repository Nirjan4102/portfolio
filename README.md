# 🚀 Personal Portfolio Website

A production-ready personal portfolio website built with **Node.js**, **Express.js**, **MongoDB**, and vanilla **HTML/CSS/JavaScript**.

## ✨ Features

- **Responsive Design** — Mobile-first UI with dark/light theme toggle
- **Dynamic Content** — Projects and skills fetched from REST API
- **Contact Form** — Server-side validation, rate limiting, and email notifications
- **Security** — Helmet headers, CORS, rate limiting, input sanitization
- **Modern Frontend** — CSS Grid/Flexbox, CSS variables, scroll animations

## 🛠️ Tech Stack

| Layer      | Technologies                                       |
|------------|----------------------------------------------------|
| Frontend   | HTML5, CSS3, JavaScript (ES6+)                     |
| Backend    | Node.js, Express.js                                |
| Database   | MongoDB, Mongoose                                  |
| Email      | Nodemailer (SMTP)                                  |
| Security   | Helmet, CORS, express-rate-limit, express-validator |

## 📁 Project Structure

```
portfolio/
├── client/                    # Static frontend assets
│   ├── css/
│   │   └── style.css          # Main stylesheet (dark/light themes)
│   ├── js/
│   │   └── main.js            # Client-side JavaScript
│   └── index.html             # Single-page HTML
├── server/                    # Backend application
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── nodemailer.js      # SMTP transporter
│   ├── controllers/
│   │   ├── projectController.js
│   │   ├── skillController.js
│   │   └── contactController.js
│   ├── models/
│   │   ├── Project.js
│   │   ├── Skill.js
│   │   └── Contact.js
│   ├── routes/
│   │   └── apiRoutes.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── validator.js
│   └── seed.js                # Database seeder
├── .env.example               # Environment template
├── .gitignore
├── package.json
├── README.md
└── server.js                  # Application entry point
```

## 📋 Prerequisites

- **Node.js** >= 18.0.0
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **npm** or **yarn**

## 🚀 Local Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
cp .env.example .env
```
Edit `.env` with your MongoDB URI and SMTP credentials.

### 4. Seed the database (optional)
```bash
npm run seed
```
This populates sample projects and skills.

### 5. Start the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Start for production
```bash
npm start
```

## 📡 API Endpoints

| Method | Endpoint        | Description                      | Rate Limited |
|--------|-----------------|----------------------------------|--------------|
| GET    | `/api/projects` | Fetch all portfolio projects     | No           |
| GET    | `/api/skills`   | Fetch categorized skills         | No           |
| POST   | `/api/contact`  | Submit contact form message      | Yes (5/15min)|

### POST `/api/contact` — Request Body
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Project Inquiry",
  "message": "I'd love to collaborate on a project..."
}
```

## 🌐 Deployment

### MongoDB Atlas
1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a database user and whitelist your IP (or 0.0.0.0/0)
3. Copy the connection string to `MONGO_URI` in `.env`

### Deploy to Render
1. Push your code to GitHub
2. Create a **New Web Service** on [render.com](https://render.com)
3. Connect your repository
4. Set:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables from `.env` in the Render dashboard
6. Deploy!

### Deploy to Vercel
> Note: Vercel is optimized for serverless. For a traditional Express app, Render or Railway is recommended.

## 📄 License

MIT License — feel free to use this for your own portfolio!
