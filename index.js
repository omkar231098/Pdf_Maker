const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');

// const { PdfRouter } = require("./Routes/pdf.route");
const { auth } = require("./Routes/auth.route");
const { connection } = require("./Config/db");

const app = express();
app.use(express.json());
require("dotenv").config();
app.use(cookieParser());

// Check for required environment variables
const requiredEnvVariables = ['DATABASE_URL', 'PORT',"SECRET_KEY"]; // Add your required variables here

for (const variable of requiredEnvVariables) {
  if (!process.env[variable]) {
    console.error(`Error: Missing required environment variable: ${variable}`);
    process.exit(1); // Exit the process with an error code
  }
}

const corsOptions = {

  origin: true, // Allow all origins

};

app.use(cors(corsOptions));
app.use("/auth", auth);
// app.use("/pdf",  PdfRouter);

const port = process.env.PORT || 8500;




app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Not able to connect to MongoDB");
    console.error(err);
    process.exit(1); // Exit the process with an error code
  }

  console.log(`Server is running on port ${port}`);
});
