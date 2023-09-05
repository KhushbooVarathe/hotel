const bcrypt = require('bcrypt')
const userSchema = require('../modals/Users')
var jwt = require('jsonwebtoken')
var express = require('express')
const app = express()
app.use(express.json())
const UserSchema = require('../modals/Users')
// const secretAccesskey='hewfehfhbgbshfbeheheh22122hhgfkdvbpdmgdnAfhcgdfd'
const register = async (req, res, next) => {
  console.log('req: ', req.body);
  try {
    const { username, email, password, isAdmin, city, address, DOB, mobile } = req.body
    console.log('number: ', mobile);
    const { filename, path } = req.file

    // Check if the email already exists in the database
    const existingUser = await userSchema.findOne({ email: email })
    if (existingUser) {
      return res.send({ error: 'Email is already registered' })
    }

    // Generate a salt with 10 rounds, this will be used to hash the password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const newUser = new userSchema({
      username: username,
      email: email,
      password: hashedPassword,
      mobile: mobile,
      isAdmin: isAdmin,
      photos: { filename: filename, path: path },
      city: city,
      address: address,
      DOB: DOB,
     
    })

    const newnewUser = await newUser.save()
    res.status(200).send({
      data: 'Added New Admin Successfully',
      newData: newnewUser.isAdmin
    })
  } catch (err) {
    next(err)
  }
}


const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Find the user by email in the database
    const user = await userSchema.findOne({ email })
    if (!user) {
      return res.send('User not found')
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.send('Invalid password')
    }

    let accessToken, refreshToken

    // Check if the user has a refreshToken already (subsequent login)
    if (user.refreshToken) {
      try {
        // Verify the refresh token
        jwt.verify(user.refreshToken, process.env.JWT_REFRESH_SECRET)

        // If verification is successful, generate new access and refresh tokens
        accessToken = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.JWT_SECRET,
          {
            expiresIn: '1h'
          }
        )
        refreshToken = user.refreshToken // Reuse the existing refresh token
      } catch (err) {
        // If verification fails, generate new tokens as it might have expired
        accessToken = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.JWT_SECRET,
          {
            expiresIn: '1h'
          }
        )
        refreshToken = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.JWT_REFRESH_SECRET,
          {
            expiresIn: '7d' // Adjust the expiration as needed
          }
        )
        user.refreshToken = refreshToken // Update the refresh token in the user's database record
        await user.save()
      }
    } else {
      // First-time login, generate access and refresh tokens
      accessToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        {
          expiresIn: '1h'
        }
      )
      refreshToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_REFRESH_SECRET,
        {
          expiresIn: '7d' // Adjust the expiration as needed
        }
      )
      user.refreshToken = refreshToken // Save the refresh token in the user's database record
      await user.save()
    }

    // Set the new access token and refresh token in cookies and response
    res
      .cookie('access_token', accessToken, {
        httpOnly: true
      })
      .status(200)
      .send({
        data: 'Login successful',
        isAdmin: user.isAdmin,
        user: user.username,
        token: accessToken,
        refreshToken: refreshToken
      })
  } catch (err) {
    next(err)
  }
}

const Refreshapi = async (req, res, next) => {
  let accessToken
  // console.log(
  //   'refreshhh api',
  //   req,
  //   'request Headeres',
  //   req.headers.refreshtoken,
  //   req.headers.authorization
  // )
  const token = req.headers.authorization
  // console.log('token=========>', token)
  const refreshtok = req.headers.refreshtoken
  // console.log('refreshtok: ', refreshtok)
  const getData = await UserSchema.find({ refreshToken: refreshtok })
  // console.log(
  //   'getData================>: ',
  //   getData,
  //   typeof getData,
  //   getData[0]._id,
  //   getData[0].isAdmin
  // )
  if (getData && getData.length > 0) {
    const user = getData[0] // Access the first element of the array
    accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h'
      }
    )
  } else {
    console.log('user not found')
  }
  // res.setHeader('Authorization', accessToken);
  res.send({ token: accessToken })
}

module.exports = { register, login, Refreshapi }
// module.exports = login;

// const userSchema=require('../modals/Users')
// const register=async(req,res,next)=>{
//     console.log(req.body)
//     try{
//         console.log("heloo")
//         const newUser=new userSchema({
//             username:req.body.username,
//             email:req.body.email,
//             password:req.body.password
//         })
//         console.log(newUser,"newUser")
//         await newUser.save()
//         res.status(200).send("Registered Successfully")
//     }catch(err){
// next(err)
//     }

// }
// module.exports=register;
