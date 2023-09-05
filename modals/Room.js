const mongoose = require('mongoose')
const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      
    },

    maxPeople: {
      type: Number,
      
    },
    price: {
      type: Number,
     
    },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
    desc: {
      type: String,
      
    },
    bookedDate: {
      type: [Date], // Define bookedDate as an array of Date objects
      default: []   // Set a default value as an empty array if needed
    },
    photos: [
      {
        filename: String,
        
      },
    ],
  },
  {
    timestamps: true
  }
)
// [
//     {number:101,unavailableDates:[01.05.2023,02.05.2023]}
//     {number:102,unavailableDates:[]}
//     {number:103,unavailableDates:[]}
//     {number:104,unavailableDates:[]}
//     {number:105,unavailableDates:[]}

// ]
module.exports = mongoose.model('roomschema', RoomSchema)
