var express = require('express')
const app = express()
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.json());
// const HotelSchema=require('../modals/Hotels')
const {Searchhotel,hotels,countByCity,createHotel,updateHotels,deleteHotels,getonehotel}=require('../controllers/hotels')
// const createHotel=require('../controllers/hotels')
// const updateHotels=require('../controllers/hotels')
// const deleteHotels=require('../controllers/hotels')
// const getonehotel=require('../controllers/hotels')
const { verifyAdmin } = require('../utils/verifyToken')
// const { createError } = require('../utils/error')
console.log("auth api")
// var createError=require('../utils/error')
//get
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
app.get('/getonehotel/:id',getonehotel)

//create
app.post('/createHotels',upload.single('image'),verifyAdmin,createHotel)
//update

app.put('/updateHotels/:id',verifyAdmin,updateHotels)
//delete
app.delete('/deleteHotels/find/:id',verifyAdmin,deleteHotels)

//getall
app.get('/hotels',hotels)
app.get('/hotels/countByCity',countByCity)
app.get('/hotels/countByType',hotels)
app.get('/search/:key',Searchhotel)

module.exports=app;