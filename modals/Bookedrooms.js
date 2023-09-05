const mongoose = require('mongoose')

const Bookedrooms = new mongoose.Schema({
  review:{type: String},
   userId: { type: String, required: true },
   roomId:{ type: String, required: true },
  roomTitle: { type: String, required: true },
  roomPrice: { type: String, required: true },
  roomMaxPeople: { type: String, required: true },
  roomdesc: { type: String, required: true },
  roomNumber: { type: String, required: true },
  roomphotos: [
    {
      filename: String,
    },
  ],
  // roomDetails: { type: Object, required: true },
  hotelName: { type: String, required: true },
  isBooking: { type: Boolean },
  fromDate: { type: String },
  toDate: { type: String },
  createdAt: { type: Date, default: Date.now }
})
module.exports = mongoose.model('bookedrooms', Bookedrooms)
