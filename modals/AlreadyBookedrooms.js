const mongoose = require('mongoose')

const AlreadyBookedrooms = new mongoose.Schema({
//   userId: { type: String, required: true },
  roomId: { type: String, required: true },
  hotelId: { type: String, required: true },
  isBooking: { type: Boolean },
  fromDate: { type: String },
  toDate: { type: String },
  createdAt: { type: Date, default: Date.now }
})
module.exports = mongoose.model('alreadybookedrooms', AlreadyBookedrooms)
