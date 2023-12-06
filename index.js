const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(express.json())
const port = 3000;


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

app.post('/upload', upload.single('image'), (req, res) => {
  console.log('Received image upload request');
  
    if (!req.file) {
      console.log('No file received');
      return res.status(400).send('No file received');
    }
    console.log('Image uploaded successfully');
    res.status(200).res.send(`/${req.file.path}`);
    

})


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     cb(null, Date.now() + ext);
//   },
// });
 
// const upload = multer({ storage: storage });

// app.post('/upload', upload.single('image'), (req, res) => {
//   console.log('Received image upload request');
  
//   if (!req.file) {
//     console.log('No file received');
//     return res.status(400).send('No file received');
//   }
//   console.log('Image uploaded successfully');
//   res.status(200).send('Image uploaded successfully');
// });

// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
