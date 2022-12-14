const express = require('express')
const router = express.Router()

//Get the three methods from the controller
const { createProfile} = require('../controller/profileController')

//Use the two methods to handle GET, POST and PUT requests
router.route( '/' ).post(createProfile)

module.exports = router