const mongoose = require('mongoose');

const Roomsreview = new mongoose.Schema({
  roomreview: { type: mongoose.Schema.Types.Mixed }, // Use Schema.Types.Mixed for mixed data
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('roomsreview', Roomsreview);
