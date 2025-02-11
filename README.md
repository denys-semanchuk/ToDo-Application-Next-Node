# Todo Application

A modern task management application built with Next.js, Redux, and TypeScript.

## Features

- 🔐 User authentication with NextAuth.js
- ✨ Modern UI with Tailwind CSS
- 📱 Fully responsive design
- 🔄 Real-time updates
- 🎯 Task priority management
- ✅ Task completion tracking
- 📊 Progress visualization
- 🌓 Dark/Light mode support

## Tech Stack

- **Frontend:**
  - Next.js 13+
  - TypeScript
  - Redux Toolkit
  - Tailwind CSS
  - Framer Motion

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - Prisma

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn
- MongoDB instance

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create a .env file in the root directory
cp .env.example .env
```

4. Add your environment variables:
```env
NEXT_PUBLIC_API_URI=http://localhost:5000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

5. Run the development server:
```bash
npm run dev
```

### API Endpoints

```typescript
// Task Management
GET    /api/tasks          // Get all tasks
POST   /api/tasks          // Create a new task
PUT    /api/tasks/:id      // Update task text
DELETE /api/tasks/:id      // Delete a task
PATCH  /api/tasks/:id/important  // Toggle task importance
PATCH  /api/tasks/:id/completed  // Toggle task completion
PATCH  /api/tasks/:id/priority   // Update task priority
```

## Project Structure

```
client/
├── app/
│   ├── components/       # Reusable UI components
│   ├── services/        # API services
│   └── store/           # Redux store setup
├── pages/               # Next.js pages
├── public/             # Static assets
├── styles/            # Global styles
└── types/             # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
