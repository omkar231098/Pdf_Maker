const getLogger = require('../Logger/logger'); // Update the path based on your actual file structure
const logger = getLogger('auth'); // Provide the route name, e.g., 'auth' for authentication routes
const { PdfModel } = require('../Model/pdf.model');
const { UserModel } = require('../Model/user.model');
const multer = require('multer');
const PDFDocument = require('pdfkit');
const path = require('path');




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
        age:req.body.age,
        address: req.body.address,
        photo: req.file.filename, // Assuming Multer sets the file object on req.file
        user: userID,
      });
      await newData.save();

      await UserModel.findByIdAndUpdate(userID, { $push: { pdfs: newData._id } });
      // Log success
      logger.info('PDF creation successful');

      // Return the saved data
      res.json(newData);
    });
  } catch (error) {
    logger.error(`Internal Server Error: ${error.message}`);
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};



const PreviewPDF = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await PdfModel.findById(id);

    if (!data) {
      logger.error('Data not found');
      return res.status(404).send('Data not found');
    }

    // Generate PDF
    const pdfDoc = new PDFDocument();
    pdfDoc.text(`Name: ${data.name}`);
    pdfDoc.text(`Age: ${data.age}`);
    pdfDoc.text(`Address: ${data.address}`);
    pdfDoc.image(path.join(__dirname, 'uploads', data.photo), { width: 200 });

    // Pipe the PDF to the response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=${data.name}_preview.pdf`);
    pdfDoc.pipe(res);
    pdfDoc.end();

    // Log success
    logger.info('PDF preview generation successful');
  } catch (error) {
    logger.error(`Internal Server Error: ${error.message}`);
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


const DownloadPDF = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await PdfModel.findById(id);

    if (!data) {
      logger.error('Data not found');
      return res.status(404).send('Data not found');
    }

    // Generate PDF
    const pdfDoc = new PDFDocument();
    pdfDoc.text(`Name: ${data.name}`);
    pdfDoc.text(`Age: ${data.age}`);
    pdfDoc.text(`Address: ${data.address}`);
    pdfDoc.image(path.join(__dirname, 'uploads', data.photo), { width: 200 });

    // Pipe the PDF to the response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${data.name}_details.pdf`);
    pdfDoc.pipe(res);
    pdfDoc.end();

    // Log success
    logger.info('PDF download generation successful');
  } catch (error) {
    logger.error(`Internal Server Error: ${error.message}`);
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};




module.exports = { CreatePDF ,PreviewPDF,DownloadPDF };