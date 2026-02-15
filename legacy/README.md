# 🍽️ Hanok Grill - MERN Stack with AI

A modern Korean restaurant website built with **MERN stack** and powered by **FastAPI AI** for intelligent dish recommendations.

## 🏗️ Architecture

```
┌─────────────────┐
│  React Frontend │ (Vite + TypeScript)
│   Port: 5173    │
└────────┬────────┘
         │
         ├──────────────────┐
         │                  │
┌────────▼────────┐  ┌──────▼──────────┐
│ Express Backend │  │  FastAPI AI     │
│   Port: 4000    │  │   Port: 8000    │
│   (Node.js)     │  │   (Python)      │
└────────┬────────┘  └─────────────────┘
         │
    ┌────▼────┐
    │ MongoDB │
    │ Port:   │
    │ 27017   │
    └─────────┘
```

## ✨ Features

### 🤖 Hanok Pic - AI Taste Buddy
- **3-Step Recommendation Flow**:
  1. **Mood Selection**: Choose from Comfort, Spicy, Heavy, Light, or Sharing
  2. **Preferences**: Set diet, spice level, and group size
  3. **AI Recommendations**: Get personalized dish suggestions with reasons

- **Smart Filtering**: Rule-based filtering before AI reasoning
- **No Typing Required**: Pure selection-based interface
- **Cultural Context**: Recommendations consider Korean cuisine traditions

### 🍜 Core Features
- **Menu Display**: Full Korean menu with prices and descriptions
- **Reservations**: Table booking with availability checking
- **Orders**: Food ordering with Razorpay payment integration
- **Responsive Design**: Works on all devices

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)
- MongoDB (running on localhost:27017)

### Quick Start (Single Command)
If you have everything installed (Node.js, Python, MongoDB), you can run the entire project with:
```bash
npm run dev
```
This will start the Frontend, Backend, and AI Service all at once!

### Individual Installation
If you prefer running them separately:

#### 1. Backend (Express)
```bash
cd backend
npm install
npm start
```
Server runs on http://localhost:4000

#### 2. AI Service (FastAPI)
```bash
cd ai-service
pip install -r requirements.txt
python main.py
```
AI service runs on http://localhost:8000

#### 3. Frontend (React)
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on http://localhost:5173

### Environment Variables

**Backend (.env)**:
```env
MONGO_URI=mongodb://127.0.0.1:27017/hanokdb
PORT=4000
```

## 📁 Project Structure

```
Hanok-Grill-Korean-Restaurant/
├── frontend/              # React + Vite + TypeScript
│   ├── src/
│   │   ├── main.ts       # App entry point
│   │   ├── hanokPic.ts   # Hanok Pic component
│   │   ├── api.ts        # API service layer
│   │   ├── types.ts      # TypeScript interfaces
│   │   └── style.css     # Premium styling
│   └── public/           # Static assets
│
├── backend/              # Express + MongoDB
│   ├── models/
│   │   ├── Reservation.js
│   │   ├── Order.js
│   │   └── Table.js
│   ├── routes/
│   │   ├── reservationRoutes.js
│   │   └── orderRoutes.js
│   └── server.js
│
└── ai-service/           # FastAPI AI
    ├── main.py           # Hanok Pic recommendation engine
    └── requirements.txt
```

## 🎨 Design Philosophy

### Color Palette
- **Primary**: `#93328E` (Korean purple)
- **Accent**: `#f9d105` (Golden yellow)
- **Background**: Dark theme with gradients

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Animations
- Smooth transitions (250ms ease)
- Micro-interactions on hover
- Fade-in and slide-up effects

## 🔌 API Endpoints

### Express Backend (Port 4000)

#### Reservations
- `POST /api/reservations` - Create reservation
- `GET /api/reservations/availability` - Check availability
- `GET /api/reservations/admin/list` - List all reservations
- `PATCH /api/reservations/:id/status` - Update status

#### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders/admin/list` - List all orders
- `PATCH /api/orders/:id/status` - Update order status
- `PATCH /api/orders/:id/payment` - Update payment status

### FastAPI AI (Port 8000)

#### Recommendations
- `POST /api/recommend` - Get AI recommendations
  ```json
  {
    "mood": "spicy",
    "diet": "non-veg",
    "spice_level": "hot",
    "group_size": "3-4"
  }
  ```

- `GET /api/menu` - Get full menu with metadata

## 🧪 Testing

### Test FastAPI
```bash
curl -X POST http://localhost:8000/api/recommend \
  -H "Content-Type: application/json" \
  -d '{"mood":"comfort","diet":"both","spice_level":"medium","group_size":"1-2"}'
```

### Test Express
```bash
curl http://localhost:4000/api/reservations/availability?date=2026-02-10&slot=19:00-20:00&guests=2&seating=indoor
```

## 🌟 Hanok Pic Workflow

```
User clicks "Find Your Perfect Dish"
         ↓
Step 1: Select Mood (😌🔥🥩🥗🎉)
         ↓
Step 2: Set Preferences (Diet, Spice, Group Size)
         ↓
Rule-Based Filtering (Backend)
         ↓
AI Reasoning (FastAPI)
         ↓
Display 3 Personalized Recommendations
         ↓
User can: Add to Cart | Try Again | View Menu
```

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Backend**: Express.js, Node.js
- **Database**: MongoDB, Mongoose
- **AI Service**: FastAPI, Python, Pydantic
- **Styling**: Custom CSS with CSS Variables
- **Payment**: Razorpay (integrated)

## 📝 License

MIT License - Feel free to use for your projects!

## 🙏 Credits

Built with ❤️ for authentic Korean cuisine lovers in Mumbai.

---

**Powered by Hanok Pic AI** 🤖✨
