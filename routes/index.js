var express = require('express');
var router = express.Router();

var Product = require('../models/product');
var User = require('../models/user');

const { body, validationResult } = require('express-validator');

//#region [rgba (128,128,128, 0.1)]  HOME PAGE
  router.get('/', function(req, res, next) {
    Product.find(function(err, result){

      // console.log(result)
      let bookArr=[];
      // let brojac = 0;

      result.forEach(e =>{
        bookArr.push(e);
        // console.log(brojac+" e: "+e.imagePath)
        // brojac++;
      })


      res.render('shop/index', { title: 'MongoDB project', books: bookArr });
      
      if(err){console.log('Error: '+err)}

    });
  });
//#endregion    
///////////////////////////////////////////////////////
//#region [rgba (0,128,128, 0.1)] USER SIGNUP

  router.get ('/user/signup', function(req, res, next){
            res.render('user/signup');
  });

  router.post ('/user/signup',
              body('email')
                .notEmpty()
                .withMessage('Email field cant be empty')
                .isEmail()
                .withMessage('Please enter valid email'),

              body('password')
                .notEmpty()
                .withMessage('Password field cant be empty')
                .isLength({ min: 5})
                .withMessage('Password must be at least 5 characters long')
                .isLength({ max: 20})
                .withMessage('Password can be at most 20 characters long')
                .matches(/[a-z]/)
                .withMessage('Password must have an uppercase letter')
                .matches(/[A-Z]/)
                .withMessage('Password must have an lowercase letter')
                .matches(/[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/)
                .withMessage('Password must have at least one specal character')
                ,

              function(req, res, next){


                    let email = req.body.email;
                    let password = req.body.password;

                    let helperObject = {
                      email: email,
                      password: password
                    }
                    
                    const errors = validationResult(req);

                    if (!errors.isEmpty()) {


                          let message = [];

                          // console.log(("/////////////////////////////////////"))
                          //   errors.errors.forEach(function(error){
                          //         console.log(error.msg)
                          //   });
                          // console.log("/////////////////////////////////////")
                          
                          if(errors){
                            errors.errors.forEach(function(error){
                              console.log(error.msg)
                                message.push(error.msg);
                            });
                          };

                          res.render('user/signup', {validationErr: message, helperObject: helperObject});
                    }

                    else{

                        User.findOne({'email': email}, function(err, userSearch){

                          if (err){
                                    console.log('Error: '+err);
                                    res.render('user/signup', {messErr: err, helperObject: helperObject});     
                          };
                          if (userSearch){
                                    console.log('Error: The user already exists')
                                    console.log(userSearch)
                                    res.render('user/signup', {userErr: true, helperObject: helperObject});
                                
                          }
                            else{
                                const user = new User({
                                  email: email,
                                  password: password
                                });
                          
                                user.save()
                                  .then((result)=>{
                                    // res.render('user/signup');
                                  })
                                  .catch(function(err){
                                      console.log(err);
                                  })
                                res.render('user/signup', {userSuc: true, helperObject: helperObject});
                              }
                          

                        })
                    }

  });
//#endregion    
///////////////////////////////////////////////////////

module.exports = router;
