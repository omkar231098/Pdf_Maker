


# SnapPDF


SnapPDF is a web application that allows users to convert input form information into PDF documents. The project aims to provide a simple and intuitive interface for users to fill out a form, preview the entered details, and download the information as a PDF file.

# Logo

<img src="https://github.com/omkar231098/Pdf_Maker/assets/109202596/127e5cc8-beb4-413d-9db4-111e01659b7b" width="200" />

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Routes](#api-routes)
- [Authentication](#authentication)
- [Logger](#logger)
- [Rate Limiter](#rate-limiter)
- [Validator](#validator)
- [Preview and Download](#preview-and-download)
- [Screenshots](#screenshots)
- [Deployed Link](#deployed-link)
- [Contribution](#contribution)
- [License](#license)

## Features

- **Dynamic Form Generation:** Create PDFs dynamically based on user input.
- **PDF Preview:** Users can preview the generated PDF before downloading.
- **Download PDF:** Provide an option for users to download the collected data in PDF format.
- **User Authentication:** Secure user registration and login functionality.
- **Responsive UI:** User-friendly and responsive design for various devices.

## Tech Stack

- React: JavaScript library for building user interfaces
- Node.js: JavaScript runtime
- Express.js: Web application framework for Node.js
- MongoDB: NoSQL database for storing user data
- PDFKit: PDF generation library
- JWT: JSON Web Tokens for secure user authentication

## Getting Started

1. **Clone the repository:**
    ```bash
    git clone https://github.com/omkar231098/Pdf_Maker.git
   
    ```
   ```bash
   cd Pdf_Maker
    ```
2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add the following:
    ```env
    PORT=8500
    DATABASE_URL=mongodb://localhost:27017/pdfmaker
    SECRET_KEY=mysecretkey
    ```

4. **Run the application:**
    ```bash
    npm run server
    ```
    The API server will be running at `http://localhost:8500`.
## API Routes

- **Form Submission**
  `POST /pdf/submit`

- **User Registration:**
  `POST /auth/register`

- **User Login:**
  `POST /auth/login`

## Authentication

SnapPDF employs token-based authentication to secure access to protected routes. User authentication is achieved through JSON Web Tokens (JWT) stored in cookies. This approach enhances security and allows for a more seamless user experience.


## Logger and Ratelimiter

SnapPDF uses logger and rate limiter middleware to enhance security, monitor application behavior, and prevent abuse of the API. This section provides information on how these components are implemented.

## Logger

### Overview

The logger middleware is responsible for logging various events and errors that occur during the execution of SnapPDF. It helps in debugging, monitoring, and understanding the application's behavior.

### Usage

The logger middleware is integrated using the following steps:

1. **Installation:**
   ```bash
   npm install --save winston
   
## Rate Limiter

SnapPDF uses a rate limiter to control the number of requests a user can make within a specific time frame. This helps prevent abuse and ensures fair usage of the application.

## Validator

Input validation is essential for ensuring that user-submitted data is accurate and secure. SnapPDF employs a validator to check and sanitize user input.


### User Registration

- **Endpoint:** `POST /auth/register`
- **Description:** This endpoint handles user registration. Users provide a valid username and password during registration. Upon successful registration, the server generates a JWT and sets it as an HTTP-only cookie.

### User Login

- **Endpoint:** `POST /auth/login`
- **Description:** Users can log in by providing their registered username and password. Upon successful authentication, the server generates a JWT and sets it as an HTTP-only cookie.


## Preview and Download

After submitting the form, users can preview the collected data before downloading the PDF. The PDF includes all the information entered in the form, with an option to download it for offline use.

## Screenshots
## 1. HomePage

![HomePage](https://github.com/omkar231098/Pdf_Maker/assets/109202596/e4060aa2-721e-45e3-be58-9a6f543315a0)


## 2. RegisterPage
![Register Page](https://github.com/omkar231098/Pdf_Maker/assets/109202596/f9900bf1-2977-45d3-a9f0-d4b340654e05)

## 3. LoginPage
![Login Page](https://github.com/omkar231098/Pdf_Maker/assets/109202596/b5c79d2f-d2c0-48bf-bfe4-a03f1ab1c09a)

## 4. PdfFormPage

![PDFForm](https://github.com/omkar231098/Pdf_Maker/assets/109202596/18610d2e-fdd2-48a7-b7c6-ce911538ae19)


## 5. PdfFormPage DEMO

![PDFDEMO](https://github.com/omkar231098/Pdf_Maker/assets/109202596/960d7c61-7829-4f63-8880-77dbc7c4d986)


## Deployed Link
The Todo App API is deployed at ()

## Contribution

We welcome contributions! If you have suggestions or improvements for the error handling process, please follow the [Contributing Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE). See the [LICENSE](LICENSE) file for details.





