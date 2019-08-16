const router = require('express').Router();
const User = require('./../models/User');
const {registerValidation, loginValidation } = require('./../validations');

router.post('/register', async (req, res) => {  
    //VALIDATING BEFORE INPUTIN IN DATA
    const { error } = registerValidation(req.body) 
    if(error) return res.status(400).send(error.details[0].message)//check for any errors, if not then move next

    //CHECK IF USER ALREADY IN THE DATABASE
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send("Email already exists"); //if no errors here after checking firs stage, then create new user


    //CREATE NEW USER
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err)
    }
})

module.exports = router;