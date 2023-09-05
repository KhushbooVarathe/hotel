var express = require('express')
const app = express()
const multer = require('multer');
const {
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers,
  getoneUser
} = require('../controllers/users')
const { verifyToken, verifyUser, verifyUser1 } = require('../utils/verifyToken')
console.log('auth api')
// app.get('/checkauthentication', verifyToken, async (req, res, next) => {
//   res.send('you are logged in')
// })
// app.get('/checkuser/:id', verifyUser, async (req, res, next) => {
//   res.send('you are logged in and you can delete your account')
// })
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Store uploaded files in the 'uploads' folder
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage });
app.get('/getUsers', getUsers)
app.get('/getoneUser/:id', getoneUser)
app.put('/updateUser/:id', verifyUser1, updateUsers)

app.post('/createUsers', verifyUser, createUsers)

app.delete('/deleteUsers/:id', deleteUsers)
module.exports = app
