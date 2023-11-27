import express from 'express';
import multer from 'multer';
import path from 'path';

const app = express();
const port = 3000;

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Set the file name to be unique
  },
});

const upload = multer({ storage: storage });

// Handle POST request to /upload
app.post('/upload', upload.single('image'), (req, res) => {
  res.status(200).send('Image uploaded successfully');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
