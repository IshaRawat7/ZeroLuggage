# ✈️ ZeroLuggage

A modern **Full Stack Web Application** that simplifies luggage transportation for travelers. Users can securely book luggage transportation, make online payments, receive confirmation emails, and view pickup/drop locations on an interactive map.

---

## 🌟 Features

- 🔐 Secure User Authentication
- 📦 Book and manage luggage transportation
- 💳 Secure online payments using Razorpay
- 📧 Automated confirmation emails
- 🗺️ Interactive Maps using OpenStreetMap
- 📱 Fully Responsive UI
- 🎨 Modern interface built with ShadCN UI
- ⚡ Fast and optimized using Next.js

---

# 📌 Project Overview

ZeroLuggage follows a **Full Stack Architecture**, where the frontend communicates with the backend through APIs, and the backend interacts with the database and third-party services.

```text
                   User
                     │
                     ▼
             Next.js Frontend
                     │
             HTTP API Requests
                     │
                     ▼
            Express.js Backend
      ┌──────────┼─────────────┐
      ▼          ▼             ▼
 PostgreSQL   Razorpay      Resend
 Database     Payments       Emails
      │
      ▼
 Prisma ORM
```

---

# 🛠️ Tech Stack

## 🎨 Frontend

| Technology | Purpose |
|------------|---------|
| React | Builds reusable UI components |
| Next.js | React framework with routing, optimization & server-side rendering |
| Tailwind CSS | Utility-first CSS framework for styling |
| ShadCN UI | Beautiful pre-built UI components |

---

## ⚙️ Backend

| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript Runtime |
| Express.js | Backend framework used to create APIs |

---

## 🗄️ Database

| Technology | Purpose |
|------------|---------|
| PostgreSQL | Stores all application data |
| Prisma ORM | Connects Express with PostgreSQL using simple JavaScript queries |

---

## 🔐 Authentication

### JWT (JSON Web Token)

JWT is used to securely authenticate users.

Login Flow:

```text
User Login
     │
     ▼
Server verifies credentials
     │
     ▼
JWT Token Generated
     │
     ▼
Stored in Browser
     │
     ▼
Authenticated Requests
```

---

## 💳 Payment Gateway

### Razorpay

Razorpay allows users to make secure online payments.

Supported Payments:

- UPI
- Debit Card
- Credit Card
- Net Banking
- Wallets

Payment Flow:

```text
Book Luggage
      │
      ▼
Create Order
      │
      ▼
Razorpay Checkout
      │
      ▼
Payment Verification
      │
      ▼
Booking Confirmed
```

---

## 📧 Email Service

### Resend

Resend is used to send automated emails such as:

- Booking Confirmation
- Payment Success
- Notifications
- Account Related Emails

---

## 🗺️ Maps Integration

### OpenStreetMap (OSM)

OpenStreetMap helps users visualize:

- Pickup Locations
- Drop Locations
- Navigation

---

# 📂 Project Structure

```text
ZeroLuggage
│
├── Frontend
│   ├── app
│   ├── components
│   ├── hooks
│   ├── lib
│   ├── public
│   └── styles
│
├── Backend
│   ├── controllers
│   ├── middleware
│   ├── prisma
│   ├── routes
│   ├── utils
│   └── server.js
│
└── README.md
```

---

# 🔄 How Everything Works

```text
User
 │
 ▼
Next.js Frontend
 │
 ▼
Express API
 │
 ▼
Prisma ORM
 │
 ▼
PostgreSQL Database

Additional Services

Express
 ├── Razorpay → Payments
 ├── Resend → Emails
 └── OpenStreetMap → Maps
```

---

# 🚀 Getting Started

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/IshaRawat7/ZeroLuggage.git
cd ZeroLuggage
```

---

## 2️⃣ Install Dependencies

### Frontend

```bash
cd Frontend/zeroluggage
npm install
```

### Backend

```bash
cd Backend
npm install
```

---

## 3️⃣ Configure Environment Variables

Create a `.env` file inside the backend directory and add:

```env
DATABASE_URL=
JWT_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RESEND_API_KEY=
```

---

## 4️⃣ Run the Backend

```bash
npm run dev
```

---

## 5️⃣ Run the Frontend

```bash
npm run dev
```

---

# 📚 Technologies Used

| Technology | Why We Used It |
|------------|----------------|
| Next.js | Fast React Framework |
| React | Component-based UI |
| Tailwind CSS | Easy and responsive styling |
| ShadCN UI | Ready-made UI components |
| Express.js | Backend APIs |
| PostgreSQL | Relational Database |
| Prisma ORM | Database Queries |
| JWT | Secure Authentication |
| Razorpay | Online Payments |
| Resend | Transactional Emails |
| OpenStreetMap | Maps Integration |
| npm | Dependency Management |

---

#  Built With

- React
- Next.js
- Express.js
- PostgreSQL
- Prisma
- Razorpay
- Resend
- OpenStreetMap
- Tailwind CSS
- ShadCN UI

---

## 👨‍💻 Developers

Built as a collaborative Full Stack Web Development project to demonstrate modern web technologies and real-world application architecture.
