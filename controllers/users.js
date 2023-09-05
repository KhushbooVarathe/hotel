const UserSchema = require('../modals/Users')

// const createUsers = async (req, res, next) => {
//   console.log('req.body', req.body)
//   const newUser = await new UserSchema(req.body)
//   console.log('newUserlllllll', newUser)
//   try {
//     const saveUser = await newUser.save()
//     console.log(saveUser, 'saveUser')
//     res.status(200).send(saveUser)
//   } catch (err) {
//     console.log('er', err)
//     // res.status(500).json(err)
//     next(err)
//   }
// }
const createUsers = async (req, res, next) => {
  console.log('req.body', req.body)

  try {
    const newUser = new UserSchema(req.body) // Corrected here
    console.log('newUserlllllll', newUser)
    const saveUser = await newUser.save()
    console.log(saveUser, 'saveUser')
    res.status(200).send(saveUser)
  } catch (err) {
    console.log('er', err)
    next(err)
  }
}



const updateUsers = async (req, res, next) => {
  console.log('req.body: ', req.body);
 
  try {
    const updatedUserData = req.body;
      
    // Update user data based on the provided ID
    const updatenewUser = await UserSchema.findByIdAndUpdate(
     
      req.params.id,
      updatedUserData,
      { new: true }
    );
    console.log('updatenewUser: ', updatenewUser);

    res.status(200).send(updatenewUser);
  } catch (err) {
    next(err);
  }
}


const deleteUsers = async (req, res, next) => {
  console.log('req.body', req.params.id)

  try {
    const deletenewUser = await UserSchema.findByIdAndDelete(req.params.id)
    console.log('deletenewUser', deletenewUser)
    res.status(200).send('User has been deleted')
  } catch (err) {
    // console.log("er",err)
    // res.status(500).json(err)
    next(err)
  }
}

const getUsers = async (req, res, next) => {
  console.log('I am User routes', req.body, 'hehehheeh')

  try {
    const AllUsers = await UserSchema.find()
    
    res.status(200).send(AllUsers)
  } catch (err) {
    next(err)
    // console.log("er",err)
    // res.status(500).json(err)
  }
}

const getoneUser = async (req, res, next) => {
  try {
    const singleUser = await UserSchema.findById(req.params.id);
    if (!singleUser) {
      return res.status(404).send({ error: 'User not found' });
    }

    // Assuming user has a photos array similar to hotels
    const userPhotoUrl = `${process.env.baseUrl}/${singleUser.photos[0].path}`;

    const userWithPhotoUrl = {
      ...singleUser.toObject(),
      photoUrl: userPhotoUrl
    };

    res.status(200).send(userWithPhotoUrl);
  } catch (err) {
    next(err);
  }
};

module.exports = { getoneUser,updateUsers, getUsers, createUsers, deleteUsers }
