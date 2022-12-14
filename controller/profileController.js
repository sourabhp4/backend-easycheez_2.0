//Profile controller to handle the GET and PUT requests

const asyncHandler = require('express-async-handler')
const Profile = require('../model/profileModel')
const Joi = require('joi')


//Method to update the profile
//POST /api/profile
const createProfile = asyncHandler( async (req, res) => {

    //Schema to validate phone
    const schema = Joi.object({

        phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required()

    })

    //phone Validation
    const result = schema.validate(req.body).error
    if(result){
        res.status(400)
        throw new Error(result.details[0].message)
    }

    //Search for existing profile with that uid
    try{
        const profile = await Profile.findOne({phone: req.body.phone})
        if(profile) throw new Error('Profile Exists')
    }
    catch(err){
        res.status(200)
        throw new Error(err.message)
    }

    //Try to create a profile
    try{

        // Create the Profile with uid for new user
        await Profile.create({
            uid: req.uid,
            phone: req.body.phone,
            username: null
        })

   }

   //Catch any error while creating profile
   catch(err){
        res.status(400)
        throw new Error('Profile creation failed')
   }

   res.status(200).send('Created Successfully')

})


module.exports = {
    createProfile
}