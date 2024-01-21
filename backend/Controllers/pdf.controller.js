const getLogger = require('../Logger/logger'); // Update the path based on your actual file structure
const logger = getLogger('auth'); // Provide the route name, e.g., 'auth' for authentication routes
const { PdfModel } = require('../Model/pdf.model');
const { UserModel } = require('../Model/user.model');

const PDFDocument = require('pdfkit');


const CreatePDF = async (req, res) => {
  const userID = req.userId;

  try {
    const { name, age, address } = req.body;

    // Generate PDF
    const pdfDoc = new PDFDocument();
    pdfDoc.text(`Name: ${name}`);
    pdfDoc.text(`Age: ${age}`);
    pdfDoc.text(`Address: ${address}`);
    pdfDoc.image(Buffer.from(req.file.buffer), { width: 100, height: 100 });
    pdfDoc.end();

    // Convert PDF to buffer
    const pdfBuffer = await new Promise((resolve) => {
      const chunks = [];
      pdfDoc.on('data', (chunk) => chunks.push(chunk));
      pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
    });

    // Find the user by the provided username
    // const user = await User.findOne({ username: req.cookies.username });

   
      // Save PDF data to MongoDB
      const pdf = new PdfModel({ name, age, address, photo: pdfBuffer.toString('base64') ,  user: userID,});
      await pdf.save();

      await UserModel.findByIdAndUpdate(userID, { $push: { pdfs: pdf._id } });
      // Update the user's pdfs array with the new PDF
     
      

      // Send the PDF buffer as response
      res.setHeader('Content-Type', 'application/octet-stream');
   res.send(pdfBuffer)
       
      
     
  } catch (error) {
    logger.error(`error in creating PDF: ${err}`);
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};










module.exports = { CreatePDF };