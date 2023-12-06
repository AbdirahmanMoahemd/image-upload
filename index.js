const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
  console.log('Received image upload request');
  
  if (!req.file) {
    console.log('No file received');
    return res.status(400).send('No file received');
  }
  console.log('Image uploaded successfully');
  res.status(200).send('Image uploaded successfully');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
