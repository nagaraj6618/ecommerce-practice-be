# eCommerce Project Backend

This is the backend for an eCommerce project using Node.js, Express, and MongoDB.

## API 
- **Link:** `https://ecommerce-practice-chi.vercel.app/api/v1`

## API Endpoints

### 1. API Status
- **Endpoint:** `/`
- **Description:** Check if the API is working.

### 2. Product Management

#### Get All Products
- **Endpoint:** `GET /product`
- **Description:** Retrieve a list of all products.

#### Add New Product
- **Endpoint:** `POST /product`
- **Description:** Add a new product.
- **Request Body:** JSON object representing the new product.

#### Delete All Products
- **Endpoint:** `DELETE /product`
- **Description:** Delete all products from the database.

### 3. Product Operations by ID

#### Get Product by ID
- **Endpoint:** `GET /product/:id`
- **Description:** Retrieve a product by its ID.

#### Update Product by ID
- **Endpoint:** `PUT /product/:id`
- **Description:** Update a product by its ID.
- **Request Body:** JSON object representing the updated product details.

#### Delete Product by ID
- **Endpoint:** `DELETE /product/:id`
- **Description:** Delete a product by its ID.

### 4. User Authentication

#### Sign In
- **Endpoint:** `POST /auth/signin`
- **Description:** User login.
- **Request Body:** JSON object with email and password.

#### Sign Up
- **Endpoint:** `POST /auth/signup`
- **Description:** User registration.
- **Request Body:** JSON object with user details (name, email, password, etc.).

#### Verify Account
- **Endpoint:** `POST /auth/otp/:id`
- **Description:** Verify user account using OTP.
- **Request Body:** JSON object with OTP.

### 5. Cart Management

#### Get All Carts
- **Endpoint:** `GET /cart`
- **Description:** Retrieve all carts.

#### Add to Cart
- **Endpoint:** `POST /cart`
- **Description:** Add a new cart.
- **Request Body:** JSON object representing the new cart.

#### Get Cart by ID
- **Endpoint:** `GET /cart/:id`
- **Description:** Retrieve a cart by its ID.

## Setup

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Create a `.env` file and add your MongoDB connection string and any other required environment variables.
4. Start the server using `npm start` or `nodemon` for development.

## Technologies Used

- Node.js
- Express.js
- MongoDB

## Author

- NAGARAJ S
