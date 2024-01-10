


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

![HomePage](https://github.com/omkar231098/Pdf_Maker/assets/109202596/0442a892-15e6-44cd-a9d6-285fd88d12c9)

## 2. RegisterPage
![Register Page](https://github.com/omkar231098/Pdf_Maker/assets/109202596/f9900bf1-2977-45d3-a9f0-d4b340654e05)

## 3. LoginPage
![Login Page](https://github.com/omkar231098/Pdf_Maker/assets/109202596/b5c79d2f-d2c0-48bf-bfe4-a03f1ab1c09a)

## 4. PdfFormPage

![PDF form](https://github.com/omkar231098/Pdf_Maker/assets/109202596/32b76c6c-87e3-49e0-8f5b-685c183c8b12)

## 5. PdfFormPage DEMO
![Working Demo](https://github.com/omkar231098/Pdf_Maker/assets/109202596/5c425f09-481e-48bc-9078-15d93769471f)










