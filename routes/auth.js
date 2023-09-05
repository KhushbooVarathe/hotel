var express = require('express')
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const app = express()
app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static('uploads'))
const {register,login,Refreshapi} = require('../controllers/auth');
const { verifyToken } = require('../utils/verifyToken');
app.use(bodyParser.json());

// const login = require('../controllers/auth')
console.log('auth api')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(req,'ressssqqqqq',file)
      cb(null, 'uploads/'); // Define the destination directory to store uploaded files
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9); // Add a unique suffix to the filename
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Use the original filename with a unique suffix
    },
  });
  
  const upload = multer({ storage });

app.post('/register',upload.single('image'), register)
app.post('/login', login)
app.get('/refresh',Refreshapi)
module.exports = app
