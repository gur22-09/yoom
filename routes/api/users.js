const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const {check,validationResult} = require('express-validator');


const User = require('../../models/User');


//@route   POST api/usersLogin
//@access  public
//test route
router.post('/',[
    check('fname','First Name is required').not().isEmpty(),
    check('lname','Last name is required').not().isEmpty(),
    check('phoneNumber','Enter a valid Phone number').isLength({min:10}),
    check('email','Please add a Valid Email').isEmail(),
    check('password','Password must contain atleast 5 characters').isLength({min:5})
],async(req,res)=>{
   const errors = validationResult(req);
   console.log(req.body);
   if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()});
   }
   const { fname,email,password,lname,phoneNumber,address} = req.body;
   
   try{
    let user = await User.findOne({email});
    
    if(user){
       return  res.status(400).json({errors:[{msg:'User already exists'}]});
    }

    user = new User({
        fname,
        lname,
        phoneNumber,
        address,
        email,
        password
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password,salt);

    //saving user
    await user.save();

    const payload ={
        user:{
            id:user.id
        }
    };

    jwt.sign(
        payload,
        config.get('jwtSecret'),
        {expiresIn:360000},
        (err,token)=>{
            if(err) throw err;
            res.json({token});
        }
    )
   }catch(err){
    console.error(err.message);
    res.status(500).send('server error');
   }
   
});

module.exports = router;