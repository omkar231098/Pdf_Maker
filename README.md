# SnapPDF

SnapPDF is a web application that allows users to convert input form information into PDF files. Users can fill out a form, preview the generated PDF, and download it.

## Tech Stack

- Frontend: React, Axios, CSS
- Backend: Node.js, Express, MongoDB
- PDF Generation: PDFKit
- Authentication: JWT (JSON Web Tokens)
- File Upload: Multer

## Features

- **Form Input:** Collect user details such as name, age, address, and photo.
- **PDF Preview:** Preview the generated PDF with the entered information and a thumbnail of the uploaded photo.
- **PDF Download:** Download the collected data in PDF format.

## Routes

- `/` - Home page or landing page.
- `/login` - User login page.
- `/form` - Form for entering user details and generating PDF.

## Usage

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/snapPDF.git
   cd snapPDF
