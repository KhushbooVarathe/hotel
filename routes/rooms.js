var express = require('express')
const app = express()
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.json());
const {AllBookedRooms,bookedreview,CancelBooking,ReviewRoom,AlreadyBookedHotelRooms,getoneRoom,BookedRooms,Room,deleteRoom,updateRoom,createRoom,AddHotelRoom,YourBookedRooms}=require('../controllers/rooms')
// const {verifyUser}=require('../controllers/rooms')
const { verifyAdmin ,verifyUser, verifyUser1} = require('../utils/verifyToken')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // console.log(req,'ressssqqqqq',file)
      cb(null, 'uploads/'); // Define the destination directory to store uploaded files
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9); // Add a unique suffix to the filename
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Use the original filename with a unique suffix
    },
  });
  
  const upload = multer({ storage });
//get
app.get('/getoneRoom/:id',getoneRoom)
//getall
app.get('/Room',Room)
//create
app.post('/createRoom/:hotelId',upload.single('photo'),verifyAdmin,createRoom)
//update
app.get('/yourbooking/:id',YourBookedRooms)
app.get('/yourbookingadmin',verifyAdmin,AllBookedRooms)
app.post('/booking/:userid/:roomid/:paramsid',verifyUser,BookedRooms)
app.put('/cancelbooking/:cancelid',verifyUser,CancelBooking)
app.put('/updateRoom/:id',upload.single('photo'),verifyAdmin,updateRoom)
//delete
app.delete('/deleteRoom/:id/:hotelId',verifyAdmin,deleteRoom)
app.post('/alreadybookingroom/:id',AlreadyBookedHotelRooms)
//getroom according to hotel
app.get('/gethotelroom/:id',verifyAdmin,AddHotelRoom)
app.get('/gethotelroomuser/:id',AddHotelRoom)
app.put('/review/:id',verifyUser1,bookedreview)
app.post('/review/:id',verifyUser1,ReviewRoom)
module.exports=app;