const getLogger = require('../Logger/logger');
const logger = getLogger('auth');
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

    // Add table
    pdfDoc.moveDown(); 
   

    for (let i = req.body.number; i > 0; i--) {
      let result;
      if (i % 3 === 0 && i % 5 === 0) {
        result = 'foo-bar';
      } else if (i % 3 === 0) {
        result = 'foo';
      } else if (i % 5 === 0) {
        result = 'bar';
      } else {
        result = `${i}`;
      }
     
      pdfDoc.text(result, { width: 100, align: 'left' });

      // Log each iteration to the console
      console.log(`Number: ${i}, Result: ${result}`);
    }

    // Stream the PDF directly to the client
    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.pipe(res);
    pdfDoc.end();

    // Save PDF data to MongoDB
    const pdf = new PdfModel({ name, age, address, user: userID });
    await pdf.save();

    await UserModel.findByIdAndUpdate(userID, { $push: { pdfs: pdf._id } });
  } catch (error) {
    console.error(`Error in creating PDF: ${error}`);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { CreatePDF };

