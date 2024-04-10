# Social Media API

## Description
Building a RESTful API for a basic social media platform. The API will facilitate user
interactions and data management within the platform.

## Setup Instructions

1. Clone the repository:

git clone <repository-url>
cd social-media-api

2. Install dependencies: 

npm install


3. Environment Variables:
Create a .env file in the root directory and add the following environment variables:

PORT=3000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>


The bot will prompt you for input, and it will generate responses based on your queries using the OpenAI API.

4. Start the server:
npm start
 


## Dependencies
1. express: For building the RESTful API server.
2. mongoose: For interacting with MongoDB.
3. bcryptjs: For hashing passwords.
4. jsonwebtoken: For generating and verifying JWT tokens.
5. multer: For handling file uploads.
6. ioredis: For caching data with Redis.
7. socket.io: For real-time communication using WebSockets.

## API Endpoints
POST /users/register: Register a new user.
POST /users/login: Login an existing user.
GET /users/profile: Get user profile
POST /posts/create: Create a new post.
GET /postfeeds: Get the personalized feed of posts for the logged-in user.
POST /posts/likepost/:postId: Like a post.
POST /posts/addcomment/:postId: Add a comment to a post.
DELETE /posts/deletecomment/:commentId: Delete a comment from a post.
GET /posts/postdetails/:postId: Get details of a post.


## Running Tests
1. To run integration tests using Jest and Supertest, use the following command:
npm test
