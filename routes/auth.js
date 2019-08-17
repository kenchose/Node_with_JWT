const router = require('express').Router();
const User = require('./../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {registerValidation, loginValidation } = require('./../validations');


//CREATE NEW USER
router.post('/register', async (req, res) => {  
    //VALIDATING BEFORE INPUTIN IN DATA
    const { error } = registerValidation(req.body) 
    if(error) return res.status(400).send(error.details[0].message)//check for any errors, if not then move next

    //CHECK IF USER ALREADY IN THE DATABASE
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send("Email already exists"); //if no errors here after checking firs stage, then create new user

    //HASH PW
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //CREATE NEW USER
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user:user._id});
    }catch(err){
        res.status(400).send(err)
    }
})


//LOGIN USER
router.post('/login', async (req, res) => {
    //LOGIN VALIDATION
    const { error } = loginValidation(req.body) 
    if(error) return res.status(400).send(error.details[0].message)
    
    //CHECK IF EMAIL EXISTS OR REGISTERED
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send("This email is not registered.");

    //IF PASSWORD VALIDATION
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send("Email/password is incorrect.");

    //CREATE AND ASSIGN TOKEN
    const token = jwt.sign({id:user._id}, process.env.TOKEN_SECRET);//2nd parameter is a secret token that lives in .env
    res.header('auth_token', token).send(token)//able to create an expirtion date on your token payload
})
module.exports = router;