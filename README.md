# 🧳 Career Portal

A full-stack job portal where job seekers can find and apply for jobs, recruiters can post jobs and manage applicants, and admins can oversee the entire platform.

🔗 **Live Demo:** [https://career-portal-one.vercel.app/](#)

---

## ✨ Features

### 👤 Job Seeker
- Register and login with JWT authentication
- Browse and search jobs with debounced search (500ms optimized API calls)
- Paginated job listings
- Apply to jobs with resume upload
- Manage profile — photo, resume, experience and education
- Track all job applications and their statuses
- Receive email notification when hired

### 🏢 Recruiter
- Register and login with JWT authentication
- Create and manage companies with logo upload
- Post jobs under a company
- View all applicants for a job
- Update application status (hired, rejected etc.)
- Receive email notification when account is blocked or unblocked by admin

### 🛡️ Admin
- Dashboard with platform stats overview
- View and delete all companies and jobs
- View all recruiters and block or unblock their accounts

---

## 🛠️ Tech Stack

**Frontend:** React.js, Tailwind CSS, shadcn/ui, React Router, Redux 

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt, Multer, Cloudinary, Resend

**Deployment:** Vercel (frontend), Render (backend)

---

## 🔐 Role Based Access

| Feature | Job Seeker | Recruiter | Admin |
|---|:---:|:---:|:---:|
| Browse Jobs | ✅ | ✅ | ✅ |
| Apply to Jobs | ✅ | ❌ | ❌ |
| Post Jobs | ❌ | ✅ | ❌ |
| Manage Companies | ❌ | ✅ | ❌ |
| View Applicants | ❌ | ✅ | ❌ |
| Manage All Jobs | ❌ | ❌ | ✅ |
| Block Recruiters | ❌ | ❌ | ✅ |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB URI
- Resend API Key
- Cloudinary account

### 1. Clone the repository
```bash
git clone [https://github.com/your-username/career-portal.git](https://github.com/Dipika-Gandash/CareerPortal/tree/main)
cd career-portal
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create `.env` in server directory:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
RESEND_API_KEY=your_resend_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIENT_URL=http://localhost:5173
```

```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd client
npm install
```

Create `.env` in client directory:
```env
VITE_API_URL=http://localhost:5000
```

```bash
npm run dev
```

---

## 📬 Email Notifications

- Candidate receives email when hired
- Recruiter receives email when account is blocked or unblocked by admin
- Powered by Resend API

---

## 📸 Screenshots

> Add screenshots here

---

## 🙋‍♂️ Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [your-linkedin](https://linkedin.com/in/your-linkedin)

---

⭐ If you found this project helpful, consider giving it a star!
