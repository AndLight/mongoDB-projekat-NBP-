var express = require('express');
var router = express.Router();

var Product = require('../models/product');
var User = require('../models/user');
// var csrf = require('csurf');
var passport = require('passport')

// var csrfProtection = csrf();
// router.use(csrfProtection);       //All routs should be protected

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
            // res.render('user/signup', {csrfToken: req.csrfToken()});
            res.render('user/signup');
  });

  // router.post ('/user/signup', passport.authenticate('local.signup', {
  //     successRedirect: 'user/profie',
  //     failureredirect: 'user/signup',
  //     failureFlash: true
  // }));
  

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
//#region [rgba (128,128,128, 0.1)] USER SIGNIN
router.get ('/user/signin', notLoggedIn, function(req, res, next){
  res.render('user/signin');
});


// let logedInObj = {
//   email: null,
//   password: null
// }

router.post ('/user/signin',
              body('email')
                .notEmpty()
                .withMessage('Email field cant be empty')
                .isEmail()
                .withMessage('Please enter valid email'),

              body('password')
                .notEmpty()
                .withMessage('Password field cant be empty'),

              function(req, res, next){


                    let email = req.body.email;
                    let password = req.body.password;
                    
                    const errors = validationResult(req);

                    if (!errors.isEmpty()) {


                          let message = [];

                          if(errors){
                            errors.errors.forEach(function(error){
                              console.log(error.msg)
                                message.push(error.msg);
                            });
                          };
                            console.log(message)
                          res.render('user/signin', {validationErr: message, email: email});
                    }

                    else{

                        User.findOne({'email': email}, function(err, userSearch){

                          if (err){
                                    console.log('Error: '+err);
                                    res.render('user/signin', {messErr: err, email: email});     
                          };
                          if (!userSearch){
                                    console.log('Error: The user does not exist')
                                    console.log(userSearch)
                                    res.render('user/signin', {userErrU: true, email: email});
                                
                          }
                            else{

                                if(userSearch.password != password){
                                    console.log('Error: The wrong password')
                                    console.log(userSearch.password)
                                    res.render('user/signin', {userErrP: true, email: email});
                                }
                                  else{
                                    //Dodaj nacin da se sacuva log in i prikaze profil info i funkcionalnost
                                    // logedInObj.email = email;
                                    // console.log(logedInObj);
                                    
                                    // req.mysession = req.sessions;
                                    // console.log(mysession)

                                    // req.mysession.email = email;
                                    // console.log(mysession)
                                    // console.log(req.session);
                                    // console.log(req.session.email);

                                    appLink.logedInObj.email = email;

                                    res.render('user/profile');
                                  }
                              }
                        })
                    }
  });

  function isLoggedIn(req, res, next){
      // if(req.session){
      if(req.mysession){
        console.log("isLoggedIn")
        console.log(req.mysession)
        return next();
    }
    res.redirect('user/pleaseLogIn')
  }

  function notLoggedIn(req, res, next){
    // if(!req.session){
    if(!req.mysession){
      console.log("notLoggedIn")
      console.log(req.mysession)
      return next();
    }
    res.redirect('/')
  }

//#endregion
///////////////////////////////////////////////////////
//#region [rgba (128,5,128, 0.1)] PROFILE PAGE 
router.get ('/user/profile',isLoggedIn, function(req, res, next){
  res.render('user/profile');
});


//#endregion
///////////////////////////////////////////////////////
//#region [rgba (55,55,5, 0.1)] LOG OUT
  router.get('/user/logout', function(req, res, next){
    // if(logedInObj.email != null){
    //   logedInObj.email = null;
    //   res.render('user/logedOutSucess');
    // }
    //   res.render('user/pleaseLogIn');
    console.log("Log out ")
    console.log(req.session)
    req.mysession.destroy();
    console.log("Log out after")
    console.log(req.session)
    res.redirect('/');
  });
//#endregion
///////////////////////////////////////////////////////
//#region [rgba (128,5,5, 0.1)] SHOPING CART 

//#endregion

// export const logedInObj = 'logedInObj';


module.exports = router;
