const HotelSchema = require('../modals/Hotels')
const baseUrl = 'http://localhost:7000'
const createHotel = async (req, res, next) => {
  console.log('req.body', req.body, typeof req.body, typeof req.file, req.file)
  const { name, type, city, address, distance, desc, cheapestprice, rating } =
    req.body
  const { filename, path } = req.file

  const newHotel = await new HotelSchema({
    name: name,
    type: type,
    city: city,
    address: address,
    distance: distance,
    desc: desc,
    cheapestprice: cheapestprice,
    rating: rating,
    photos: { filename: `${req.file.filename}` }
  })
  console.log('newHotellllllll', newHotel)
  try {
    const saveHotel = await newHotel.save()
    console.log(saveHotel, 'saveHotel')
    res.status(200).send(`${saveHotel.name} Added Successfully`)
  } catch (err) {
    console.log('er', err)
    // res.status(500).json(err)
    next(err)
  }
}

const updateHotels = async (req, res, next) => {
  console.log('req.body', req.body)

  try {
    const updatenewHotel = await HotelSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    console.log('updatenewHotel', updatenewHotel)
    res.status(200).send(updatenewHotel)
  } catch (err) {
    // console.log("er",err)
    // res.status(500).json(err)
    next(err)
  }
}

const deleteHotels = async (req, res, next) => {
  console.log('req.body', req.body)

  try {
    const deletenewHotel = await HotelSchema.findByIdAndDelete(req.params.id)
    console.log('deletenewHotel', deletenewHotel)
    res.status(200).send('hotel has been deleted')
  } catch (err) {
    // console.log("er",err)
    // res.status(500).json(err)
    next(err)
  }
}

const hotels = async (req, res, next) => {
  try {
    console.log('I am hotel routes', req.body, 'hehehheeh')
    console.log('heeeeeeeeeeeeeeeeeeeeeeee')

    const AllHotels = await HotelSchema.find()

    const hotelss = AllHotels.map(data => {
      const hotelurl = `${baseUrl}/${data.photos[0].filename}`
      return { ...data.toObject(), photoUrl: hotelurl }
    })

    console.log('hotelss: ', hotelss)
    res.status(200).send(hotelss)
  } catch (err) {
    next(err)
  }
}

const getonehotel = async (req, res, next) => {
  console.log('I am hotel routes', req.body, 'hehehheeh',req.params.id)

  try {
    const AllHotels = await HotelSchema.findById(req.params.id)
    console.log('AllHotels: ', AllHotels.photos[0].filename);
    AllHotels.photos[0].filename=`${process.env.baseUrl}/${ AllHotels.photos[0].filename}`
    console.log('AllHotels: ', AllHotels);
    res.status(200).send(AllHotels)
  } catch (err) {
    next(err)
    // console.log("er",err)
    // res.status(500).json(err)
  }
}

const countByCity = async (req, res, next) => {
  console.log(
    'I am hotel routesooeeeeeeeeeeeeeeeeooooooo',
    req.query.cities,
    'hehehheeh'
  )
  const cities = req.query.cities.split(',')
  try {
    const list = await Promise.all(
      cities.map(city => {
        return HotelSchema.countDocuments({ city: city })
      })
    )

    res.status(200).send(list)
  } catch (err) {
    next(err)
    // console.log("er",err)
    // res.status(500).json(err)
  }
}
const Searchhotel = async (req, res) => {
  try {
    console.log(req, 'requesttttt')
    const searchKey = req.params.key.toLowerCase() // Convert the search key to lowercase

    // Use $regex case-insensitive option 'i' to make the search case-insensitive
    let result = await HotelSchema.find({
      $or: [
        { name: { $regex: searchKey, $options: 'i' } },
        { city: { $regex: searchKey, $options: 'i' } },
        { distance: { $regex: searchKey, $options: 'i' } }
      ]
    })

    res.send(result)
  } catch (err) {
    console.log('err', err)
    res.send('Internal Error')
  }
}

module.exports = {
  Searchhotel,
  hotels,
  countByCity,
  getonehotel,
  createHotel,
  deleteHotels,
  updateHotels
}
