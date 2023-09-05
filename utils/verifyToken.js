const jwt = require('jsonwebtoken');
const createError = require('./error');

const verifyToken = async (req, res, next) => {
  console.log('requesttttttttttttt=>>>>>>>>>>>: ',  req,req.headers);
  // const token = req.cookies.access_token;
  const token=req.headers.authorization;
  console.log('token===========>',token)
  const tokenWithoutBearer = token.split(' ')[1];
console.log(tokenWithoutBearer);
  console.log("token1111ffffffffffffffffffffffffff11111111", tokenWithoutBearer,req.body);

  if (!tokenWithoutBearer) {
    return next(createError(401, "You are not authenticated."));
  }

  jwt.verify(tokenWithoutBearer, process.env.JWT, (err, decoded) => {
    if (err) {
      return next(createError(403, "Your token is not valid."));
    }

    req.user = decoded; // Assuming the decoded user information is stored in the `req.user` object
    // console.log(req.user, 'uy67777790ser');
    next();
  });
};

const verifyUser = async (req, res, next) => {
  console.log(req,req.body, "mainreqqqq");
  verifyToken(req, res, () => {
    console.log(req, req.body, "user object");
    console.log(req.params, "reqqq");
    console.log('req.body.id === req.params.id || req.body.isAdmin: ', req.body.id === req.params.id || req.body.isAdmin);

    if (req.body.id === req.params.id || req.body.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized."));
    }
  });
};
const verifyUser1 = async (req, res, next) => {
  console.log(req.body, "mainreqqqq");
  verifyToken(req, res, () => {
    console.log(req, req.body, "user object",req.body._id);
    console.log(req.params, "reqqq");
    if (req.body._id === req.params.id || req.body.isAdmin || req.body.userId === req.params.id) {
      next();
    } else {
      return next(createError(403, "You are not authorized."));
    }
  });
};

const verifyAdmin=async(req,res,next)=>{
  // console.log(req,"reqAdmin")
verifyToken(req,res,()=>{
  console.log(req,req.headers,typeof req.headers.isadmin,'ret7t7777q: ', req.body);
  if(req.headers.isadmin){
    
    next();
  }else{
    return next(createError(403,"you are not authorized"))
  }
})
}

module.exports = { verifyToken, verifyUser ,verifyUser1,verifyAdmin};








// var jwt = require('jsonwebtoken');
// // const errorjs=require('./error');
// const createError = require('./error');
// const verifyToken=async(req,res,next)=>{
//     console.log(req.cookies,"cookiessssssss")
//     const token=req.cookies.access_token;
//     console.log("token111111111111",token)
//     if(!token){
//         return next(createError(401,"you are not authentication"))
//     }
//     jwt.verify(token,process.env.JWT,(err,user)=>{
//         console.log(user,"userssssssssssss",err)
//         if(err)
//         return next(createError(403,"your token is not valid"))


//         req.user=user;
//         console.log( req.user,'user')
//         next()
//     })
// }
// const verifyUser=async(req,res,next)=>{
//     console.log(req.body,"mainreqqqq")
//     verifyToken(req,res,()=>{
//         console.log(req,"ressssssssssssqqqqqqqqq",req.cookies)
//         console.log(req.params,"reqqq")
//        if(req.user.id === req.params.id || req.user.isAdmin) 
//        next()
//        else{
//         return next(createError(403,"your token is not authorized"))
//        }
//     })

// }
// module.exports={verifyToken,verifyUser};