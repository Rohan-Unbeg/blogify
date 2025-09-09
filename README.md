# Blogify - A Full-Stack Blog Application

![Blogify Screenshot](https://images.unsplash.com/photo-1504639725590-34d0984388bd)

## Live Demo

Experience Blogify live here: [https://blogify-0f27.onrender.com/](https://blogify-0f27.onrender.com/)

## Project Overview

Blogify is a robust full-stack blogging platform that allows users to create, view, and interact with blog posts. Built with a modern technology stack, it emphasizes secure user authentication, dynamic content management, and a seamless user experience.

## Features

*   **User Authentication:** Secure signup, login, and logout functionalities with password hashing and JWT-based session management.
*   **Blog Management (CRUD):** Users can create, view, and manage their blog posts, including adding cover images.
*   **Commenting System:** Engage with content by adding comments to individual blog posts.
*   **Dynamic Content Rendering:** All blog posts and comments are fetched and displayed dynamically from the database.
*   **Image Uploads:** Support for uploading cover images for blog posts.
*   **Responsive Design:** Basic styling ensures a decent user experience across various devices.
*   **Environment Variable Management:** Secure handling of sensitive information using `.env` files.

## Tech Stack

*   **Backend:**
    *   `Node.js`: JavaScript runtime environment.
    *   `Express.js`: Web application framework for Node.js.
    *   `MongoDB`: NoSQL database for flexible data storage.
    *   `Mongoose`: Elegant MongoDB object modeling for Node.js.
    *   `jsonwebtoken`: For creating and verifying JWTs for secure authentication.
    *   `cookie-parser`: Middleware to parse cookies.
    *   `multer`: Middleware for handling `multipart/form-data`, primarily for file uploads.
    *   `crypto`: Node.js built-in module for cryptographic functionalities (e.g., password hashing).
    *   `dotenv`: To load environment variables from a `.env` file.
*   **Frontend:**
    *   `EJS (Embedded JavaScript)`: Templating engine for dynamic HTML generation.
    *   `HTML5`, `CSS3`: For structuring and styling web content.
*   **Development Tools:**
    *   `nodemon`: Automatically restarts the Node.js application when file changes are detected.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   `Node.js` (LTS version recommended)
*   `MongoDB` (local installation or cloud service like MongoDB Atlas)
*   `npm` (Node Package Manager)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Rohan-Unbeg/blogify.git # Replace with actual repo URL if different
    cd blogify
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file:**
    Create a file named `.env` in the root directory of the project and add the following environment variables. Replace the placeholder values with your actual MongoDB URI and a strong secret key.

    ```
    PORT=8000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_jwt_key
    ```
    *   **`PORT`**: The port number on which the server will run (e.g., `8000`).
    *   **`MONGODB_URI`**: Your MongoDB connection string. For local MongoDB, it might be `mongodb://localhost:27017/blogify`. For MongoDB Atlas, use your provided connection string.
    *   **`JWT_SECRET`**: A strong, random string used to sign and verify JWTs.

### Running the Application

1.  **Start the development server:**
    ```bash
    npm run dev
    ```
    This will start the server using `nodemon`, which automatically restarts the server when code changes are detected.

2.  **Access the application:**
    Open your web browser and navigate to `http://localhost:8000` (or the port you specified in your `.env` file).

### Populating Sample Data

To add some sample blog posts and a dummy user to your database, you can run the `populate_blogs.js` script:

```bash
node populate_blogs.js
```
*Note: This script will clear existing blog data and create a dummy user (`dummy@example.com` with password `password123`) and five sample blog posts.*

## Project Structure

```
.
├── controller/
├── middlewares/
│   └── auth.middleware.js
├── models/
│   ├── blog.model.js
│   ├── comment.model.js
│   └── user.model.js
├── public/
│   ├── css/
│   │   └── style.css
│   ├── images/
│   └── uploads/
├── routes/
│   ├── blog.routes.js
│   └── user.routes.js
├── services/
│   └── authentication.js
├── views/
│   ├── 404.ejs
│   ├── addBlog.ejs
│   ├── blog.ejs
│   ├── home.ejs
│   ├── signin.ejs
│   ├── signup.ejs
│   └── partials/
│       ├── footer.ejs
│       ├── head.ejs
│       ├── nav.ejs
│       └── scripts.ejs
├── .env
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
├── populate_blogs.js
├── README.md
└── seed.js
```

## Contributing

Contributions are welcome! Please feel free to fork the repository, create a new branch, and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the ISC License.

## Acknowledgements

*   Inspired by various full-stack development tutorials.
*   Special thanks to the Node.js, Express.js, MongoDB, and EJS communities for their excellent tools and documentation.