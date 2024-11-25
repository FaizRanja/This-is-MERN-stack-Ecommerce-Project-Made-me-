const express=require("express");
const { registerUser,loginUser, Logout, 
    forgotPassword, resetPassword, 
    getUserdatils, updatePassword,
     updateProfile, getAllUser, 
     getSingleUser, 
     updateUserrole,
     deleteUser } = require("../Controllar/UserControllar");
const { isAuthenticated,authorizeRoles} = require('../middleware/auth');
const router = express.Router();

router.route('/register').post(registerUser)

router.route('/Login').post(loginUser)

router.route('/password/forget').post(forgotPassword)

router.route('/password/reset/:token').put(resetPassword)


router.route('/Logout').post(Logout)

router.route('/me').get (isAuthenticated,getUserdatils)

router.route('/password/update').put (isAuthenticated,updatePassword)

router.route('/me/update').put (isAuthenticated,updateProfile)

router
  .route("/admin/users")
  .get(isAuthenticated, authorizeRoles("admin"), getAllUser);

  router
  .route("/admin/user/:id")
  .get(isAuthenticated, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticated,authorizeRoles("admin"),updateUserrole)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteUser)

module.exports=router