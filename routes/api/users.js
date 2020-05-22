const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {check,validationResult} = require('express-validator');


const User = require('../../models/User');


//@route   POST api/users
//@access  public
//test route
router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('email','Please add a Valid Email').isEmail(),
    check('password','Password must contain atleast 5 characters').isLength({min:5})
],async(req,res)=>{
   const errors = validationResult(req);

   if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()});
   }
   const { name,email,password } = req.body;
   
   try{
    let user = User.findOne({email});
    
    if(user){
        res.status(400).json({errors:[{msg:'User already exists'}]})
    }

    user = new User({
        name,
        email,
        password
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password,salt);

    //saving user
    await user.save();

    res.send('user registered');
   }catch(err){
    console.error(err.message);
    res.send('server error');
   }
   
});

module.exports = router;