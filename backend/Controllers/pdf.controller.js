const getLogger = require('../Logger/logger'); // Update the path based on your actual file structure
const logger = getLogger('auth'); // Provide the route name, e.g., 'auth' for authentication routes
const { PdfModel } = require('../Model/pdf.model');
const { UserModel } = require('../Model/user.model');
const multer = require('multer');
const PDFDocument = require('pdfkit');


const CreatePDF = async (req, res) => {
  const userID = req.userId;

  try {
    const upload = multer({
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
      limits: {
        fileSize: 50 * 1024 * 1024, // 50 MB
      },
    }).single('photo');

    // Call the Multer middleware to handle file upload
    upload(req, res, async (err) => {
      if (err) {
        logger.error(`File upload failed: ${err.message}`);
        return res.status(500).send('File upload failed');
      }

      // Ensure req.file is defined before accessing its properties
      if (!req.file) {
        return res.status(400).send('No file uploaded');
      }

      // Save data to MongoDB
      const newData = new PdfModel({
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
        photo: req.file.filename,
        user: userID,
      });

      await newData.save();
      await UserModel.findByIdAndUpdate(userID, { $push: { pdfs: newData._id } });

      // Generate PDF
      const pdfDoc = new PDFDocument();

      // Handle 'error' event to ensure proper error logging
      pdfDoc.on('error', (error) => {
        console.error('PDF generation error:', error);
        res.status(500).send('PDF generation error');
      });

      // Pipe the PDF stream to the response
      res.setHeader('Content-Disposition', `attachment; filename=${newData.name}_details.pdf`);
      res.setHeader('Content-Type', 'application/pdf');
      pdfDoc.pipe(res);

      pdfDoc.text(`Name: ${newData.name}`);
      pdfDoc.text(`Age: ${newData.age}`);
      pdfDoc.text(`Address: ${newData.address}`);
      pdfDoc.image(`uploads/${newData.photo}`, { width: 200 });

      

      pdfDoc.end(); // Close the PDF stream
    });
  } catch (error) {
    logger.error(`Internal Server Error: ${error.message}`);
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};










module.exports = { CreatePDF };