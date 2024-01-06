const mongoose = require("mongoose");

const PhotoSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalname: { type: String, required: true },
  path: { type: String, required: true },
});

const PdfSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  photos: [PhotoSchema], // Array to store photo information
});

const PdfModel = mongoose.model("Pdf", PdfSchema);

module.exports = { PdfModel };
