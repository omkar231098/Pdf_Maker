const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    
   
    
    username: { type: String, required: true, unique: true }, 
    password: { type: String, required: true },
    pdfs: [{ type: mongoose.Types.ObjectId, ref: "Pdf" }],
    
  });

const UserModel = mongoose.model("User", UserSchema);
module.exports = { UserModel };
