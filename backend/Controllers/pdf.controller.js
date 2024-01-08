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
    }).single('photo');

    // Call the Multer middleware to handle file upload
    upload(req, res, async (err) => {
      if (err) {
        logger.error(`File upload failed: ${err.message}`);
        return res.status(500).send('File upload failed');
      }

      // Save data to MongoDB
      const newData = new PdfModel({
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
        photo: req.file.filename, // Use req.file instead of req.file.filename
        user: userID,
      });

      try {
        await newData.save();
        await UserModel.findByIdAndUpdate(userID, { $push: { pdfs: newData._id } });

        // Generate PDF
        const pdfDoc = new PDFDocument();
        res.setHeader('Content-Disposition', `attachment; filename=${newData.name}_details.pdf`);

        pdfDoc.text(`Name: ${newData.name}`);
        pdfDoc.text(`Age: ${newData.age}`);
        pdfDoc.text(`Address: ${newData.address}`);
        pdfDoc.image(`uploads/${newData.photo}`, { width: 200 });

        // Pipe the PDF document to the response stream
        pdfDoc.pipe(res);

        // End the response stream after piping the PDF document
        pdfDoc.end();

        logger.info('PDF creation successful');

        // Do not write to the response stream after it has been ended
      } catch (saveError) {
        logger.error(`Error saving data to MongoDB: ${saveError.message}`);
        console.error(saveError);
        res.status(500).send('Error saving data to MongoDB');
      }
    });
  } catch (error) {
    logger.error(`Internal Server Error: ${error.message}`);
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};





module.exports = { CreatePDF };