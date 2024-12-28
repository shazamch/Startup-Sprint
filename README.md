
---

# Startupsprint 

## Overview
**Startupsprint** is a dynamic and minimalistic startup-oriented social platform built using the **MERN Stack**. It empowers entrepreneurs and investors to connect, collaborate, and grow. Designed to accommodate future scalability, the platform supports features like startup creation, social interaction, investment, and more.

---

## Features
### User Management
- **Login/Signup**: Secure authentication using JWT.
- **User Profile**: View and manage individual user profiles.

### Startup Management
- **Create a Startup**: Entrepreneurs can register their startups and customize their profiles.
- **View Startups**: Discover startups and access their detailed profiles.
- **Join a Startup**: Users can join startups to collaborate.

### Social Features
- **Posts**: Users can create posts to share updates, ideas, or discussions.
- **View Posts**: Access posts shared by startups and other users.
- **Like Posts**: Interact with posts to show appreciation.

### Investment Opportunities
- **Invest in Startups**: Facilitate user-driven investment opportunities.

### Real-Time Messaging
- **Chat Between Users**: Enable seamless communication through private messaging.
- **Group Chats**: Allow team and startup members to collaborate.

### Enhanced User Experience
- **Notifications**: Real-time updates for likes, messages, and other activities.
- **Search and Filters**: Advanced search capabilities for posts and startups.

### Analytics and Insights
- **User Dashboard**: Overview of user activity and interactions.
- **Startup Insights**: Performance metrics to help startups analyze their progress.

---


# Tech Stack

## Frontend
- **React.js**
- **Vite**
- **Tailwind CSS**

## Backend
- **Node.js**
- **Express.js**

## Database
- **MongoDB**

## Authentication
- **JSON Web Tokens (JWT)**

## Real-Time Communication
- **Socket.IO**

## Deployment
- **Frontend**: AWS
- **Backend**: AWS
- **Link**: http://52.71.51.45/

## Tools
- **Postman** for API testing
- **Git** for version control
- **VS Code** for development



## Installation and Setup
### Prerequisites
- **Node.js** and **npm** installed.
- A valid **MongoDB connection string**.

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/ayeshag7/startupsprint.git
   ```
2. Navigate to the backend folder:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure environment variables:
   - Create a `.env` file in the backend folder.
   - Add the following details:
     ```env
     PORT=3000
     MONGODB_CONNECT="<MongoDB connection string>"
     ACCESS_TOKEN_SECRET="<Your access token secret>"
     REFRESH_TOKEN_SECRET="<Your refresh token secret>"
     PASSWORD="<Your email password>"
     USER="<Your email address>"
     ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the frontend folder.
   - Add the following details:
     ```env
     VITE_BASE_URL=http://localhost:3000/
     ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

---

## API Structure (Sample)
### User Authentication
#### Register User
- **Endpoint**: `POST /api/auth/register`
- **Body**:
  ```json
  {
    "Name": "string",
    "email": "string",
    "password": "string",
    "gender": "string"
  }
  ```

#### Login User
- **Endpoint**: `POST /api/auth/login`
- **Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

### Posts
#### Create a Post
- **Endpoint**: `POST /api/posts/create`
- **Body**:
  ```json
  {
    "content": "string",
    "userId": "string",
    "startupId": "string"
  }
  ```

#### View Posts
- **Endpoint**: `GET /api/posts`
- **Response**:
  ```json
  [
    {
      "id": "string",
      "content": "string",
      "likes": 0,
      "createdBy": "string"
    }
  ]
  ```

---

## Methodology to Run the Project
1. **Clone the repository**:
   ```bash
   git clone https://github.com/shazamch/Startup-Sprint.git
   ```
2. **Setup Backend**:
   - Navigate to the backend directory.
   - Install dependencies and configure `.env` as outlined in **Backend Setup**.
   - Start the backend server.

3. **Setup Frontend**:
   - Navigate to the frontend directory.
   - Install dependencies and configure `.env` as outlined in **Frontend Setup**.
   - Start the frontend server.

4. **Access the Application**:
   - Open a browser and navigate to `http://localhost:5173/` to access the frontend.
   - Ensure the backend is running on `http://localhost:3000/`.

---

## Folder Structure
### Backend
```
backend/
├── middleware/
├── routes/
├── utils/
├── models/
├── controllers/
├── config/
├── app.js
└── server.js
```

### Frontend
```
frontend/
├── components/
├── pages/
├── context/
├── elements/
├── styles/
├── App.jsx
└── main.jsx
```

---

## Contributing
1. Fork the repository and create a new branch.
2. Make changes and commit them.
3. Submit a pull request for review.

---

## Future Enhancements
- **Comprehensive Payment Integration**: Secure payment gateways for processing investments.
- **Feedback System**: Enable users to rate startups and provide reviews.  
