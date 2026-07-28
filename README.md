# Social Media Platform API

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express](https://img.shields.io/badge/Express.js-4.x-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green)
![REST API](https://img.shields.io/badge/API-REST-blue)
![GraphQL](https://img.shields.io/badge/Alternative_API-GraphQL-E10098)
![Socket.IO](https://img.shields.io/badge/Real--Time-Socket.IO-black)
![Tests](https://img.shields.io/badge/Tests-Mocha%20%7C%20Chai-yellow)

Backend service for a full-stack social media application built with Node.js, Express, MongoDB, JWT, and Socket.IO.

This repository contains the server-side application. The React frontend is maintained in a separate repository.

- **Frontend repository:** [View the React frontend](FRONTEND_REPOSITORY_URL)
- **GraphQL implementation:** [View the GraphQL branch](GRAPHQL_BRANCH_URL)

> The default branch contains the REST API implementation. An alternative
> GraphQL implementation is maintained in a separate branch.

## Overview

The backend provides authentication, user status management, post management, image uploads, pagination, and real-time post synchronization.

Registered users can sign in, retrieve posts, create posts with images, and modify or delete posts they own. The server broadcasts post changes through Socket.IO, allowing connected frontend clients to update without refreshing the page.

## Features

### Authentication and users

- User registration and login
- Password hashing using bcrypt
- JSON Web Token authentication
- One-hour token expiration
- Protected API routes
- User status retrieval and updates
- Authentication middleware
- Request validation

### Post management

- Create posts with a title, content, and image
- Retrieve paginated posts
- Retrieve an individual post
- Update posts
- Delete posts
- Restrict updates and deletions to the post creator
- Associate posts with their creators
- Sort posts by creation date

### Media handling

- Image upload using Multer
- Support for PNG, JPG, and JPEG files
- Static image serving
- Removal of replaced or deleted image files
- UUID-based uploaded filenames

### Real-time communication

- Socket.IO server integration
- Real-time post creation events
- Real-time post update events
- Real-time post deletion events

### Reliability and testing

- Centralized error-handling middleware
- Input validation using `express-validator`
- Authentication middleware tests
- Authentication controller tests
- Feed controller tests
- Mocha, Chai, and Sinon test tooling

## Tech Stack

| Area | Technologies |
|---|---|
| Runtime | Node.js |
| Web framework | Express.js |
| Database | MongoDB |
| Object modelling | Mongoose |
| Authentication | JSON Web Token |
| Password security | bcrypt |
| Validation | express-validator |
| File uploads | Multer |
| Real-time communication | Socket.IO |
| Testing | Mocha, Chai, Sinon |
| Development | Nodemon |
| Alternative API | GraphQL implementation in a separate branch |

## Architecture

The application follows a route-controller-model structure.

```text
React Client
     |
     | HTTP requests and JWT
     v
Express Routes
     |
     +---- Validation Middleware
     |
     +---- Authentication Middleware
     |
     v
Controllers
     |
     +---- Mongoose Models ----> MongoDB
     |
     +---- Multer -------------> Local Image Storage
     |
     +---- Socket.IO ----------> Connected Clients
```

### Request flow

1. The React client sends a request to an Express route.
2. Protected routes pass through JWT authentication middleware.
3. Request fields are validated using `express-validator`.
4. The controller executes the requested business logic.
5. Mongoose reads from or writes to MongoDB.
6. Post changes are broadcast to connected clients through Socket.IO.
7. The server returns a JSON response or a standardized error response.

## Project Structure

```text
nodejs-restapi/
├── controllers/
│   ├── auth.js
│   └── feed.js
├── middleware/
│   └── is-auth.js
├── models/
│   ├── post.js
│   └── user.js
├── routes/
│   ├── auth.js
│   └── feed.js
├── test/
│   ├── auth-controller.js
│   ├── auth-middleware.js
│   ├── feed-controller.js
│   └── start.js
├── images/
├── app.js
├── socket.js
├── package.json
└── .env.example
```

## Data Models

### User

A user contains:

| Field | Type | Description |
|---|---|---|
| `email` | String | User's email address |
| `password` | String | Hashed password |
| `name` | String | User's display name |
| `status` | String | Profile status message |
| `posts` | ObjectId array | References to posts created by the user |

The default user status is:

```text
I am new!
```

### Post

A post contains:

| Field | Type | Description |
|---|---|---|
| `title` | String | Post title |
| `content` | String | Post body |
| `imageUrl` | String | Path to the uploaded image |
| `creator` | ObjectId | Reference to the user who created the post |
| `createdAt` | Date | Automatically generated creation time |
| `updatedAt` | Date | Automatically generated update time |

## REST API Endpoints

### Authentication

| Method | Endpoint | Protected | Description |
|---|---|---:|---|
| `PUT` | `/auth/signup` | No | Register a new user |
| `POST` | `/auth/login` | No | Authenticate a user and return a token |
| `GET` | `/auth/status` | Yes | Retrieve the authenticated user's status |
| `PATCH` | `/auth/status` | Yes | Update the authenticated user's status |

### Feed

| Method | Endpoint | Protected | Description |
|---|---|---:|---|
| `GET` | `/feed/posts?page=1` | Yes | Retrieve paginated posts |
| `POST` | `/feed/post` | Yes | Create a post with an image |
| `GET` | `/feed/post/:postId` | Yes | Retrieve a specific post |
| `PUT` | `/feed/post/:postId` | Yes | Update a post owned by the user |
| `DELETE` | `/feed/post/:postId` | Yes | Delete a post owned by the user |

## Authentication

After a successful login, the server returns:

```json
{
  "token": "generated-jwt",
  "userId": "user-id"
}
```

Protected requests must include the token:

```http
Authorization: Bearer YOUR_TOKEN
```

The authentication middleware verifies the token and adds the decoded user ID to the request:

```js
req.userId
```

Tokens expire after one hour.

## Validation

During registration:

- Email must have a valid format.
- Email must not already exist.
- Password must contain at least five characters.
- Name must not be empty.

For posts:

- Title must contain at least five characters.
- Content must contain at least five characters.
- An image is required when creating a post.

Validation errors return HTTP status `422`.

## Image Uploads

Post creation and update requests use `multipart/form-data`.

The uploaded file field must be named:

```text
image
```

Supported MIME types:

```text
image/png
image/jpg
image/jpeg
```

Uploaded images are available through:

```text
/images/<filename>
```

UUID values are used as filenames to reduce filename collisions.

## Pagination

Posts are returned in reverse chronological order, with the newest posts first.

Example request:

```http
GET /feed/posts?page=1
```

The response includes the posts and total number of available items:

```json
{
  "message": "Fetched posts successfully.",
  "posts": [],
  "totalItems": 10
}
```

The current implementation returns two posts per page.

## Real-Time Events

The server emits a Socket.IO event named:

```text
posts
```

The event includes an action identifying the change.

### Post created

```json
{
  "action": "create",
  "post": {}
}
```

### Post updated

```json
{
  "action": "update",
  "post": {}
}
```

### Post deleted

```json
{
  "action": "delete",
  "post": "deleted-post-id"
}
```

The React frontend can listen for these events and update the feed immediately.

## Error Handling

The application uses centralized Express error middleware.

Errors are returned in the following format:

```json
{
  "message": "Error description",
  "data": []
}
```

Depending on the request, the API may return:

| Status | Meaning |
|---:|---|
| `401` | Authentication failed |
| `403` | User is not authorized to modify the post |
| `404` | User or post was not found |
| `422` | Request validation failed |
| `500` | Internal server error |

## Getting Started

### Prerequisites

Install:

- Node.js
- npm
- MongoDB Atlas or a local MongoDB server

### Clone the repository

```bash
git clone BACKEND_REPOSITORY_URL
cd nodejs-restapi
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
TEST_MONGODB_URI=your_test_database_connection_string
JWT_SECRET=your_long_random_jwt_secret
PORT=8080
```

Do not commit the `.env` file.

An `.env.example` file should be included to document the required variables:

```env
MONGODB_URI=
TEST_MONGODB_URI=
JWT_SECRET=
PORT=8080
```

### Start the development server

```bash
npm start
```

The API runs by default at:

```text
http://localhost:8080
```

## Running Tests

Run all tests with:

```bash
npm test
```

The test suite currently covers:

- Missing authorization headers
- Invalid authorization header structures
- JWT decoding and user ID extraction
- Database failure handling during login
- User status retrieval
- Association of a newly created post with its creator

A separate test database should be used through `TEST_MONGODB_URI`.

## GraphQL Version

An alternative GraphQL implementation is available in a separate branch:

```text
GRAPHQL_BRANCH_NAME
```

To run that implementation:

```bash
git switch GRAPHQL_BRANCH_NAME
npm install
npm start
```

See the branch-specific code for its GraphQL schema, resolvers, queries, and mutations.

## Security Considerations

The application uses:

- Hashed passwords
- JWT-protected endpoints
- Post ownership verification
- File-type filtering
- Request validation
- Environment variables for secrets

For production deployment, the project should additionally use:

- Restricted CORS origins
- Rate limiting
- Secure HTTP headers
- Cloud-based image storage
- Refresh tokens or a stronger session strategy
- Production logging
- Strong file-size and upload validation

## Future Improvements

- Add comments and likes
- Add user follow relationships
- Add refresh-token support
- Make the pagination limit configurable
- Store uploaded images in cloud storage
- Add OpenAPI documentation
- Expand integration and end-to-end tests
- Improve Socket.IO authentication
- Add automated continuous integration

## License

This project is licensed under the ISC License.
