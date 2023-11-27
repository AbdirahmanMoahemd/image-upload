import express from "express";
import multer from "multer";
import path from "path";

const app = express();
const port = 5000;

// Set up multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Specify the destination folder
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     cb(null, Date.now() + ext); // Set the file name to be unique
//   },
// });

// const upload = multer({ storage: storage });

// // Handle POST request to /upload
// app.post('/upload', upload.single('image'), (req, res) => {
//   res.status(200).send('Image uploaded successfully');
// });

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

app.post("/upload", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
