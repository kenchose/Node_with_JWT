//TESTING OUT JWT

const router = require('express').Router()
const verify = require('./verifyToken') //adding verify to any route makes it private

router.get('/', verify,  (req, res) => { //route is now private and we have access to all the users information
    res.json({
        posts:{
            title:"My first post", 
            description:"Data only accessed with token"
        }
    });
    // res.send(req.user) //all of users info
    // User.findOne({_id:req.user}) //find user by ID
})

module.exports = router