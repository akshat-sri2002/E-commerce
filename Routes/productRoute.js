const express = require('express')
const {create,getAllProduct,getProductDetails} = require('../Controllers/productController')
const {isAuthenticatedUser} = require('../Middleware/Auth')
// const isAuthenticatedUser = require('../Middleware/auth')

const router = express.Router()
router.route('/create').post(isAuthenticatedUser, create)
router.route('/getAllProduct').get(getAllProduct)
router.route('/getProductDetails/:_id').get(getProductDetails)
module.exports = router