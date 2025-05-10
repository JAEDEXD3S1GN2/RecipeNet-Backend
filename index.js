const express = require("express");
const consign = require("consign");
const path = require("path");
const fs = require("fs");
const { cloudinary } = require("./utils/cloudinary");

const PORT = 3000;
const app = express();

app.set("json spaces", 4);

// Define the folder path relative to the current working directory
const folderPath = path.join(process.cwd(), "uploads/images"); // Replace 'uploads/images' with your folder name

// Function to check and create folder
function ensureFolderExists(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log("Folder created.");
  } else {
    console.log("Folder already exists.");
  }
}

// Call the function
ensureFolderExists(folderPath);

// Serve static files from the uploads/images directory
app.use("/uploads/images", express.static(folderPath));

consign({ verbose: false })
  .include("libs/config.js")
  .then("db.js")
  .then("auth.js")
  .then("libs/middlewares.js")
  .then("routes")
  .then("libs/boot.js")
  .into(app);
