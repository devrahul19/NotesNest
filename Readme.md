# NotesNest

A modern note-taking application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- 📝 Create and manage notes
- 🔐 User authentication
- 📱 Responsive design
- 💾 Draft saving
- 🖼️ Image upload support
- 👍 Like/save functionality

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Headless UI
- React Router
- Framer Motion

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Bcrypt

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/notesnest.git
cd notesnest
```

2. Install Backend Dependencies
```bash
cd backend
npm install
```

3. Install Frontend Dependencies
```bash
cd frontend
npm install
```

4. Environment Setup
Create a `.env` file in the backend directory:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=4000
```

### Running the Application

1. Start the Backend Server
```bash
cd backend
npm run dev
```

2. Start the Frontend Development Server
```bash
cd frontend
npm run dev
```

## API Endpoints

- `POST /user/register` - Register new user
- `POST /user/login` - User login
- `GET /user/profile` - Get user profile
- `POST /notes` - Create new note
- `GET /notes` - Get all notes
- `PUT /notes/:id` - Update note
- `DELETE /notes/:id` - Delete note

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
