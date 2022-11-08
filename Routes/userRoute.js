const express = require('express')
const {create,read,put, patch,Delete,login,dummyApi,logout, changePwd,updateUser, getAllUser,createAdmin}= require('../Controllers/userController')
const {isAuthenticatedUser, isAdmin} = require('../Middleware/auth')



const router = express.Router()
router.route('/create').post(create)
router.route('/read').get(read)
router.route('/login').post(login)
router.route('/put').put(put)
router.route('/patch').patch(patch)
router.route('/Delete/:_id').delete(Delete)
router.route('/dummyApi').get(dummyApi)
router.route('/logout').get(logout)
router.route('/changePwd').post(isAuthenticatedUser,changePwd)
router.route('/updateUser').post(isAuthenticatedUser,updateUser)
router.route('/getAllUser').get(isAuthenticatedUser,isAdmin,getAllUser)
router.route('/createAdmin:_id').post(isAuthenticatedUser,isAdmin,createAdmin)
module.exports = router