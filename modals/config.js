var express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyPraser = require('body-parser')
const cors= require('cors')
const url = `mongodb+srv://khushboova:123mongodb@cluster0.v3hgc9f.mongodb.net/Testing1?retryWrites=true&w=majority`

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  mongoose
    .connect(url, connectionParams)
    .then((resp) => {
      console.log('Connected to database ')
    })
    .catch(err => {
      console.error(`Error connecting to the database. \n${err}`)
    })