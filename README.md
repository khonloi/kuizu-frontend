# Kuizu 📚

Kuizu is a modern, utility-first flashcard learning platform designed to help students and teachers organize study materials efficiently. Inspired by industry leaders but built with a clean, high-performance architecture, Kuizu enables users to create, share, and master study content through an intuitive and responsive interface.

> [!NOTE]
> This project is a continuation of the original [Kuizu](https://github.com/Kuizu-Organization/kuizu) repository.

## 🚀 Features

- **Dynamic Flashcards**: Create and study flashcard sets with a streamlined interface.
- **Content Organization**: Group related study sets into Folders for better academic structure.
- **Collaborative Classes**: Connect with other students or join teacher-led classes to study together.
- **Responsive Dashboard**: A unified view of your recent activity, suggested content, and active classes.
- **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile using Tailwind CSS.
- **Administrator Suite**: Comprehensive management tools for administrators to handle content submissions and user statistics.

## 🛠️ Tech Stack

Kuizu is built using the **MERN stack** for full-stack performance and scalability:

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js & Express.js
- **Database**: MongoDB
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Authentication**: Custom JWT & Context-based Auth Provider
- **State Management**: React Hooks & Context API

## 📦 Project Structure

```text
src/
├── api/            # API service layers and mock data handlers
├── components/     # Reusable UI elements and layout components
│   ├── layout/     # Navbar, Sidebar, and Footer
│   └── ui/         # Buttons, Cards, Modals, and Loaders
├── context/        # Authentication, Toast, and Modal contexts
├── features/       # Feature-specific logic (e.g., Study sets, Search)
├── hooks/          # Custom React hooks
├── pages/          # Primary view components
└── utils/          # Formatting and helper functions
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v16.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/kuizu-frontend.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 📄 License

&copy; 2026 Kaison Corporation. All rights reserved.
