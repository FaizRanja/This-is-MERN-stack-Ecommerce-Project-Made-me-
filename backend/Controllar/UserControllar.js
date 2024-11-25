
const ErrorHandler = require("../utils/ErrorHandler");
const CathasyncError=require("../middleware/CathasyncError")
const  User=require("../modules/UserModules");
const sendToken = require("../utils/JwtToken");
 const sendEmail =require("../utils/sendEmail")
 const crypto = require("crypto");
 const  cloudinary=require ('cloudinary') 


// RegisterUser  
exports.registerUser = CathasyncError(async (req, res, next) => {

  const myCloud=await cloudinary.v2.uploader .upload(req.body.avatar,{
    folder:"avatars",
    width:"150",
    crop:"scale" 
  })
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      
      },
    });
    sendToken(user,201,res)
});
// Login User
exports.loginUser =CathasyncError(async (req, res, next) => {
  
    const { email, password } = req.body;
    // checking if user has given password and email both
    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email & Password", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
    sendToken(user, 200, res);
  });

// LogOut User
exports.Logout=CathasyncError(async(req,res,next)=>{
  res.cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly:true,
  })
  res.status(200).json({
    
    success:true,
    message:"Logged Out",
  })
})
// Forget password 
exports.forgotPassword = CathasyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}//${req.get("host")}/password/reset/${resetToken}`;

  const message = `Your password reset token is  :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
 
  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password 
exports.resetPassword = CathasyncError(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get user datils

exports.getUserdatils=CathasyncError(async(req,res,next)=>{
const user=await User.findById(req.user.id)

res.status(200).json({
  success:true,
  user,
})

})

// uPDATE user password

exports.updatePassword = CathasyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// Update user Profile


exports.updateProfile =CathasyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }


  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Profile Updated Successfully",
  
  });
});

// get all user (admin)

exports.getAllUser=CathasyncError(async(req,res,next)=>{
  const users=await User.find();

  res.status(200).json({
    success:true,
    users,
  })
})
 
// get Single user (admin)

exports.getSingleUser=CathasyncError(async(req,res,next)=>{
  const user=await User.findById(req.params.id);

  if(!user){
    return next( new ErrorHandler(`user does not exist with is ${req.params.id}`) )   
  }

  res.status(200).json({
    success:true,
    user,
  })
})

// Update user role

exports.updateUserrole =CathasyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role:req.body.role
  };


  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message:"user role updated successfully"
  
  });
});

// delete user 

// Delete User --Admin
exports.deleteUser = CathasyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  const imageId=user.avatar.public_id

  await cloudinary.v2.uploader.destroy(imageId)

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});









