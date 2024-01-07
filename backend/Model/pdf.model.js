const mongoose = require("mongoose");



const PdfSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  photo: { type: String, required: true },
});

const PdfModel = mongoose.model("Pdf", PdfSchema);

module.exports = { PdfModel };
