const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');


const { PdfRouter } = require("./Routes/pdf.route");
const { auth } = require("./Routes/auth.route");
const { connection } = require("./Config/db");

const app = express();
app.use(express.json({ limit: '50mb' }));
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
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
// app.use(cors(corsOptions));
app.use("/auth",auth);
app.use("/pdf",PdfRouter);

app.use(express.urlencoded({ extended: true, limit: '50mb' }));






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
