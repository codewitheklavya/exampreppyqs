# 📚 exampreppyqs

exampreppyqs is a web application that allows students to browse, search, and download Previous Year Question Papers (PYQs) organized by course, semester, and year.

The project is built with **React**, **TypeScript**, **Express.js**, **Supabase**, and **ImageKit**.

---

## ✨ Features

- 🔍 Smart search for question papers
- 📂 Browse papers by:
  - Course
  - Semester
  - Year
- 📄 PDF preview & download
- 🔐 User Authentication
  - Email & Password
  - Google Login
  - Email Verification
- 👤 Guest Mode
- 🛠 Admin Panel
- ☁️ ImageKit integration for PDF storage
- 🗄 Supabase database
- ⚡ Automatic ImageKit → Supabase synchronization

---

## 🛠 Tech Stack

### Frontend

- React
- TypeScript
- React Router
- Tailwind CSS
- Supabase JS

### Backend

- Node.js
- Express.js
- TypeScript
- Multer
- ImageKit SDK
- Supabase

### Database

- Supabase PostgreSQL

### File Storage

- ImageKit

---

# Folder Structure

```
Project
│
├── Frontend
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── layouts
│   │   ├── lib
│   │   ├── pages
│   │   └── types
│
├── Backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   └── server.ts
│
└── README.md
```

---

# ImageKit Folder Structure

```
PYQS
│
├── BCA
│   ├── SEM1
│   │   ├── 2022
│   │   ├── 2023
│   │   └── 2024
│   │
│   ├── SEM2
│   ├── SEM3
│   ├── SEM4
│   ├── SEM5
│   └── SEM6
│
├── BBA
│
├── BCOM
│
└── More Courses...
```

---

# File Naming Convention

Every PDF should follow this format:

```
Subject Name Subject-Code Year.pdf
```

Example

```
Operating System MJ-07 2024.pdf

Digital Electronics MN-1B 2022.pdf

Web Designing MN-2B 2024.pdf
```

If multiple sets exist:

```
CPP MJ-02 Set-1 2023.pdf

CPP MJ-02 Set-2 2023.pdf

Statistics MDC-3 Set-3 2023.pdf
```

Supported formats:

```
CPP MJ-2 2023.pdf

CPP_MJ-2_2023.pdf

CPP MJ-2 Set-1 2023.pdf

CPP_MJ-2_Set-1_2023.pdf
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/PYQSBank.git
```

---

## Frontend

```bash
cd Frontend

npm install

npm run dev
```

---

## Backend

```bash
cd Backend

npm install

npm run dev
```

---

# Environment Variables

## Frontend (.env)

```env
VITE_SUPABASE_URL=

VITE_SUPABASE_ANON_KEY=
```

---

## Backend (.env)

```env
PORT=5000

IMAGEKIT_PUBLIC_KEY=

IMAGEKIT_PRIVATE_KEY=

IMAGEKIT_URL_ENDPOINT=

SUPABASE_URL=

SUPABASE_SERVICE_ROLE_KEY=
```

---

# Authentication

The project uses Supabase Authentication.

Supported methods:

- Email & Password
- Google OAuth

Email verification is enabled for additional account security.

---

# Image Synchronization

The backend automatically parses ImageKit file paths and extracts:

- Course
- Semester
- Year
- Subject
- Subject Code
- Paper Type
- Set Number

Then inserts paper metadata into Supabase.

Example:

```
/PYQS/BCA/SEM3/2023/CPP MJ-02 Set-1 2023.pdf
```

Automatically becomes

```
Course: BCA

Semester: 3

Year: 2023

Subject: CPP

Subject Code: MJ-02

Paper Type: MJ

Set Number: 1
```

---

# Search

Students can search using:

- Subject name
- Subject code
- Paper type
- Course
- Year

Examples:

```
cpp

MJ-02

VAC-1

2023

SEM3

Operating System

Web Designing

Statistics
```

---

# Future Improvements

- ⭐ Favorites
- 📈 Most Downloaded Papers
- 📊 Admin Dashboard Analytics
- ❤️ Like System
- 📥 Download Counter
- 🔖 Bookmark Papers
- 🔎 Advanced Filters
- 📱 Progressive Web App (PWA)

---

# Security

- Email Verification
- Row Level Security (RLS)
- Secure ImageKit Storage
- Protected Admin Upload
- Environment Variables

---

# License

This project is licensed under the MIT License.

---

# Author

**Eklavya Singh**

GitHub: https://github.com/codewitheklavya

Email: codewitheklavya@gmail.com

---

⭐ If you like this project, don't forget to star the repository.
