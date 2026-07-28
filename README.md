# Social Media Platform API

![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![REST API](https://img.shields.io/badge/API-REST-blue)
![GraphQL](https://img.shields.io/badge/API-GraphQL-E10098?logo=graphql)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--Time-black?logo=socket.io)

Backend service for a full-stack social media platform built with **Node.js**, **Express.js**, **MongoDB**, **JWT Authentication**, **Socket.IO**, and **GraphQL**.

This project demonstrates two backend implementations:

- **main** → REST API implementation
- **28-GraphQl** → Alternative GraphQL implementation

The React frontend is maintained in a separate repository.
- 💻 **Frontend:** https://github.com/zkrandish/React-Frontend.git

---

# Features

## User Authentication

- User registration
- Secure login
- Password hashing using **bcrypt**
- JWT authentication
- Protected routes
- User profile status
- Authentication middleware

---

## Post Management

Users can:

- Create posts
- View posts
- Retrieve individual posts
- Update their own posts
- Delete their own posts
- Upload images
- View paginated feeds

Each post is associated with its creator through MongoDB relationships.

---

## Image Uploads

The application supports image uploads using **Multer**.

Features include:

- PNG / JPG / JPEG validation
- UUID-generated filenames
- Static image serving
- Automatic cleanup of replaced and deleted images

---

## Real-Time Updates (REST API)

The REST implementation uses **Socket.IO** to broadcast:

- New posts
- Updated posts
- Deleted posts

allowing connected clients to update instantly without refreshing.

---

## GraphQL API

The GraphQL implementation provides:

### Queries

- Login
- User
- Posts
- Single Post

### Mutations

- Create User
- Create Post
- Update Post
- Delete Post
- Update User Status

The GraphQL endpoint supports:

- Authentication
- Validation
- Pagination
- Custom error formatting
- GraphiQL playground

---

## Validation

Input validation includes:

- Email validation
- Password length validation
- Required field validation
- Post title validation
- Post content validation

Invalid requests return structured validation errors.

---

## Security

The backend includes:

- Password hashing
- JWT authentication
- Route protection
- Authorization checks
- Ownership verification
- GraphQL authentication middleware
- Centralized error handling

---

# Tech Stack

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Authentication

- JSON Web Tokens (JWT)
- bcrypt

## APIs

- REST API
- GraphQL

## Real-Time Communication

- Socket.IO

## File Uploads

- Multer

## Validation

- express-validator
- validator.js

## Development

- Nodemon

---

# Architecture

```text
                 React Frontend
                        │
        ┌───────────────┴────────────────┐
        │                                │
     REST API                     GraphQL API
      (main)                   (graphql-api)
        │                                │
        └───────────────┬────────────────┘
                        │
                 Authentication
                 JWT Middleware
                        │
                 Controllers / Resolvers
                        │
                  Mongoose Models
                        │
                     MongoDB
                        │
               Image Storage (Multer)
                        │
             Socket.IO (REST branch)
```

---

# Project Structure

```text
.
├── controllers/
├── graphql/
│   ├── schema.js
│   └── resolvers.js
├── middleware/
├── models/
├── routes/
├── util/
├── images/
├── test/
├── app.js
├── socket.js
└── package.json
```

---

# Data Models

## User

```text
User
│
├── email
├── password
├── name
├── status
└── posts[]
```

---

## Post

```text
Post
│
├── title
├── content
├── imageUrl
├── creator
├── createdAt
└── updatedAt
```

---

# REST API Endpoints

## Authentication

| Method | Endpoint | Description |
|----------|----------|-------------|
| PUT | /auth/signup | Register user |
| POST | /auth/login | Login |
| GET | /auth/status | Get user status |
| PATCH | /auth/status | Update status |

---

## Feed

| Method | Endpoint |
|----------|----------|
| GET | /feed/posts |
| GET | /feed/post/:id |
| POST | /feed/post |
| PUT | /feed/post/:id |
| DELETE | /feed/post/:id |

---

## Image Upload

```
PUT /post-image
```

---

# GraphQL Operations

## Queries

```graphql
query {
  posts(page: 1) {
    totalPosts
    posts {
      title
      content
      imageUrl
    }
  }
}
```

---

## Login

```graphql
query {
  login(
    email: "user@email.com",
    password: "password"
  ) {
    token
    userId
  }
}
```

---

## Create Post

```graphql
mutation {
  createPost(postInput:{
    title:"Hello",
    content:"First post",
    imageUrl:"images/photo.jpg"
  }){
    _id
    title
  }
}
```

---

# Testing

The REST implementation includes unit tests for:

- Authentication middleware
- Authentication controller
- Feed controller

using:

- Mocha
- Chai
- Sinon

---

# Future Improvements

- Comments
- Likes
- Friend system
- Notifications
- Refresh tokens
- Cloud image storage
- Docker support
- CI/CD pipeline
- API documentation using Swagger/OpenAPI

---

# Frontend

The React frontend is available in a separate repository.

➡️ **Frontend Repository**

 https://github.com/zkrandish/React-Frontend.git

---



# Author

**Zahra Karandish**

Software Developer

GitHub: https://github.com/<your-username>

LinkedIn: https://linkedin.com/in/<your-profile>
