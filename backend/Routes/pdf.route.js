const express = require("express");
const PdfRouter = express.Router();

const { CreatePDF } = require("../Controllers/pdf.controller");

// const { authenticate } = require("../Auth/verifyToken");
// const limiter = require('../RateLimiter/rate.limiter')

PdfRouter.use(express.json());

// Define routes with associated controller methods and authentication middleware
PdfRouter.post("/submit",CreatePDF);  // Added a leading slash ("/")
// PdfRouter.get("/preview", PreviewPDF);  // Added a leading slash ("/")
// PdfRouter.get("/download/:id", DownloadPDF);  // Added a leading slash ("/")

module.exports = { PdfRouter };
