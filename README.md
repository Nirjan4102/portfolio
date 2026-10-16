# 🚀 Nirjan Mondal — Full-Stack Personal Portfolio Website

A production-ready personal portfolio website built with **Node.js**, **Express.js**, **MongoDB**, and vanilla **HTML5 / CSS3 / ES6+ JavaScript** following a clean **MVC / Layered Architecture**.

🌐 **Live Demo:** [https://nirjan4102.github.io/portfolio/](https://nirjan4102.github.io/portfolio/)  
📦 **GitHub Repository:** [https://github.com/Nirjan4102/portfolio](https://github.com/Nirjan4102/portfolio)

---

## ✨ Features & Requirements

- **Responsive & Mobile-First UI**: Custom CSS Grid and Flexbox layouts with full mobile navigation drawer and active scroll highlighting.
- **Enterprise Dark & Light Themes**: Professional slate and cobalt tech color system with `localStorage` memory persistence.
- **Backend-Driven Dynamic Content**: Dynamic GitHub repository integration via REST API fetching live public repos from `https://api.github.com/users/Nirjan4102/repos`.
- **RESTful API Endpoints**: Endpoints for projects, categorized skills, profile data, and contact submissions.
- **Robust Contact Form**: Client-side feedback, server-side validation using `express-validator`, rate limiting to prevent spam, and database persistence in MongoDB.
- **Server-Side Email Alerts**: Automatic HTML notification dispatch using `nodemailer` (SMTP).
- **Security & Reliability**: `helmet` security headers, `cors` cross-origin control, and `express-rate-limit`.
- **Architectural Integrity**: Pure MVC layered architecture.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | HTML5, CSS3 (Custom Variables, Flexbox, Grid), JavaScript (ES6+ Vanilla) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose ORM |
| **Email Service**| Nodemailer (SMTP / Gmail) |
| **Security** | Helmet, CORS, express-rate-limit, express-validator |
| **Deployment** | GitHub Pages (Live Frontend), Render / Vercel (Full-Stack Backend) |

---

## 📁 Project Structure (MVC / Layered Architecture)

```
portfolio/
├── client/                     # [VIEW] Presentation Layer
│   ├── css/
│   │   └── style.css           # Professional Slate & Cobalt Stylesheet (Dark/Light)
│   ├── js/
│   │   └── main.js             # Client-side dynamic data fetching & interactions
│   ├── favicon.svg             # Tech SVG Favicon
│   └── index.html              # Semantic HTML5 Single Page Application
├── server/                     # [BACKEND] Application Layer
│   ├── config/
│   │   ├── db.js               # MongoDB connection with resilient error handling
│   │   └── nodemailer.js       # SMTP email transporter
│   ├── controllers/            # [CONTROLLER] Request handling & business logic
│   │   ├── projectController.js# Dynamic GitHub repo fetching & MongoDB sync
│   │   ├── skillController.js  # Categorized technical skills
│   │   ├── profileController.js# Bio, stats, and profile data
│   │   └── contactController.js# Form validation, DB save & email notification
│   ├── models/                 # [MODEL] Mongoose data schemas
│   │   ├── Project.js          # Project schema (title, stack, urls, featured)
│   │   ├── Skill.js            # Skill schema (name, category, proficiency)
│   │   └── Contact.js          # Contact submission schema
│   ├── routes/
│   │   └── apiRoutes.js        # RESTful API route definitions
│   ├── middleware/
│   │   ├── errorHandler.js     # Centralized global error handling
│   │   └── validator.js        # express-validator request rules
│   └── seed.js                 # Database seeder script
├── .env.example                # Environment variable template
├── .gitignore                  # Git exclusion rules (protects .env)
├── package.json                # Dependencies and npm scripts
├── render.yaml                 # Render cloud deployment blueprint
├── vercel.json                 # Vercel serverless configuration
├── README.md                   # Complete documentation
└── server.js                   # Application entry point
```

---

## 📡 RESTful API Endpoints

| Method | Endpoint | Description | Rate Limited |
|---|---|---|---|
| `GET` | `/api/projects` | Fetch all portfolio projects (dynamically synced with GitHub) | No |
| `GET` | `/api/skills` | Fetch categorized skills (Frontend, Backend, Tools) | No |
| `GET` | `/api/profile` | Fetch profile summary, tagline, bio, and statistics | No |
| `POST` | `/api/contact` | Submit contact form message with server validation | **Yes** (5 req / 15 min) |

### Sample `POST /api/contact` Payload:
```json
{
  "name": "Alex Johnson",
  "email": "alex@example.com",
  "subject": "Full-Stack Project Collaboration",
  "message": "Hi Nirjan, I loved your portfolio projects and would like to discuss an opportunity."
}
```

---

## 🚀 Local Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/Nirjan4102/portfolio.git
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
Update `.env` with your settings:
```env
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/portfolioDB
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_digit_app_password
RECEIVER_EMAIL=your_email@gmail.com
GITHUB_USERNAME=Nirjan4102
```

### 4. Seed sample data (optional)
```bash
npm run seed
```

### 5. Start the server
```bash
# Production mode:
npm start

# Development mode (with nodemon):
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Cloud Deployment Guide

### Deploying on Render (Free Tier)
1. Push your repository to GitHub.
2. Sign in to [render.com](https://render.com) using your GitHub account.
3. Click **New +** $\rightarrow$ **Web Service** $\rightarrow$ Connect `Nirjan4102/portfolio`.
4. Configure environment variables:
   - `MONGO_URI`: Your MongoDB Atlas URI.
   - `SMTP_USER`: Your Gmail address.
   - `SMTP_PASS`: Your 16-character Google App Password.
   - `RECEIVER_EMAIL`: Your email address.
5. Deploy and get your permanent live URL!

---

## 📄 License

This project is open-source under the **MIT License**.
Authored by **Nirjan Mondal** ([GitHub](https://github.com/Nirjan4102) | [LinkedIn](https://www.linkedin.com/in/nirjan-mondal-863235294/)).
