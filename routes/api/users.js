const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator');
//@route   POST api/users
//@access  public
//test route
router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('email','Please add a Valid Email').isEmail(),
    check('password','Password must contain atleast 5 characters').isLength({min:5})
],(req,res)=>{
   const errors = validationResult(req);

   if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()});
   }
   res.send('user route');
});

module.exports = router;