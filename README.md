# Internship Portal

A simple Internship Portal using the MERN (MongoDB, Express.js, React.js, Node.js) stack.

# author
Hari Prasad Joshi

## Features

- User registration and login with JWT authentication.
- Joi validation for request data.
- advanced different transport based logging with winston and morgan.
- Robust Error handling with Express Error Handler and express-async-errors.
- High Security encryption is used for the password.
- Appropriate routes are protected with JWT authorization
- MongoDB for data storage.
- Well structured in directories for high scalability and maintainability.
- Automatic seed opportunities data from the json file to DB on startup without duplicating them.
- High end security implemented using Cors and Helmet npm packages.
- Advanced filtering, searching and sorting for opportunities.
- Well Documented in JSDoc style for ease and developer friendly.

## Project Structure

```├── src/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ └── authController.js
│ │ └── opportunityController.js
│ ├── middlewares/
│ │ ├── authMiddleware.js
│ │ ├── errorHandler.js
│ │ └── logger.js
│ ├── models/
│ │ └── userModel.js
│ │ └── userOpportunityModel.js
│ │ └── opportunityModel.js
│ ├── routes/
│ │ └── userRoutes.js
│ │ └── opportunityRoutes.js
│ ├── validations/
│ │ └── userValidation.js
│ │ └── opportunityValidation.js
│ ├── app.js
│ └── server.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```


## Setup

1. Clone the repository
2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the project root and add your environment variables:

    ```env
    PORT=3000
    DB_URI=mongodb://localhost:27017/internship-portal
    TOKEN_SECRET=your_jwt_secret_key
    ```

4. Start the server:

    ```bash
    npm run dev
    ```

## Endpoints

### Auth Endpoints
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login a user
* For now Logout is handled at frontend part as usual, even though using redis more secure logout could have been implemented but that was out of scope of the assignment

### Auth Endpoints
- `GET /api/v1/opportunities` - List opportunities with advanced and dynamic search, filter and sorting.
- `POST /api/v1/opportunities/apply/:opportunityId` - Apply for opportunity (Protected Route)


## Middleware

- `authMiddleware.js` - JWT authentication middleware
- `errorHandler.js` - Global error handling middleware
- `logger.js` - Logging middleware using winston

## License

This project is licensed under the MIT License.
