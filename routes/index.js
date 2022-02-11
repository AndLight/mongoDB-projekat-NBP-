let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt-nodejs')
let LocalStrategy   = require('passport-local').Strategy;
let passport = require('passport');

let Product = require('../models/product');
let User = require('../models/user');
let Cart = require('../models/cart');
let Order = require('../models/order');
// const initializePassport  =require('../config/passport');

const { body, validationResult } = require('express-validator');

// const users = [];

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
                    let password = bcrypt.hashSync(req.body.password)
                    // console.log(password)
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
                                  .then()
                                  .catch(function(err){
                                      console.log(err);
                                  })
                                // res.render('user/signup', {userSuc: true, helperObject: helperObject});
                                res.render('user/signup', {userSuc: true});
                              }
                          

                        })
                    }
                    

  });

  
//#endregion    
///////////////////////////////////////////////////////
//#region [rgba (128,128,128, 0.1)] USER SIGNIN
router.get ('/user/signin', function(req, res, next){
  res.render('user/signin');
});

logedInMail= null;



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
                    // let password = bcrypt.hashSync(req.body.password);

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
                    }else{
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

                                bcrypt.compare(password, userSearch.password, (err, data) => {
                                    if (err) {
                                      console.log(err);
                                      console.log('Error: The wrong password');
                                      res.render('user/signin', {userErrP: true, email: email});
                                    };
                                    if (data) {
                                      logedInMail = email;
                                      sesionObj = req.session;
                                      sesionObj.email=email;
                                      // res.render('user/profile');
                                      res.redirect('/')
                                    };
                                  });
                                  
                              }
                        })
                    }
  });

  let sesionObj;
  function isLoggedIn(req, res, next) {
    // if (logedInMail !== null) {
    //     return next();
    // }
    // res.redirect('/user/signin');
    if(req.session.email){
      // console.log("req.session: ")
      // console.log(req.session.email)
      return next();
    }
    console.log(req.session.email)
    res.redirect('/user/signup');
}

//#endregion
///////////////////////////////////////////////////////
//#region [rgba (128,5,128, 0.1)] PROFILE PAGE 
router.get ('/user/profile',isLoggedIn, function(req, res, next){

  Order.find({mail: req.session.email}, function(err, orders){
      if(err){console.log(err)}
      
      let cart;
      let orderArr = [];
    orders.forEach(function(order){
      // console.log(order.cart.items)
      cart = new Cart(order.cart);

      console.log("cart: ")
      console.log(cart)
      console.log("////////////////////////////////////////////////")

      order.items = cart.generateArray();
      orderArr.push(cart.generateArray());
      
      console.log("order.cart")
      console.log(order.items)
    })
    console.log("////////////////////////////////////////////////")
    console.log("orders")
    console.log(orders)

    console.log("////////////////////////////////////////////////")
    console.log("orderArr")
    console.log(orderArr)
    // let br = 0;
    // orders.forEach(function(ord){
    //   console.log(br)
    //   console.log(ord.cart)
    //   br++;
    // })
    let arr = [1,2,3,4]
    
    res.render('user/profile', {orders: orders, mail: req.session.email });
  });

  // res.render('user/profile');
});


//#endregion
///////////////////////////////////////////////////////
//#region [rgba (55,55,5, 0.1)] LOG OUT
  router.get('/user/logout', function(req, res, next){
    // if(logedInMail != null){
    //   logedInMail = null;
    //   res.render('user/logedOutSucess');
    // }else{
    //   res.render('user/pleaseLogIn');
    // }
    // console.log("Log out ")
    // console.log(req.session)
    // req.mysession.destroy();
    // console.log("Log out after")
    // console.log(req.session)
    // res.redirect('/');
    req.logout();
    delete req.session.email;
    delete req.session.cart;
    // console.log(req.session.cart)
    // console.log("logout: ")
    // console.log(req.session.email)
    res.redirect('/');
  });
//#endregion
///////////////////////////////////////////////////////
//#region [rgba (128,5,5, 0.1)] SHOPING CART 
  router.get('/add-to-cart/:id', function(req, res, next){
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err, product) {
      if (err) {
          return res.redirect('/');
      }
       cart.add(product, product.id);
       req.session.cart = cart;
       console.log(req.session.cart);
       res.redirect('/');
   });
  });

  router.get('/shoppingCart', function(req,res,next){
    if (!req.session.cart) {
      return res.render('shop/shoppingCart', {products: null});
    } 
   let cart = new Cart(req.session.cart);
   res.render('shop/shoppingCart', 
              {products: cart.generateArray(), 
              totalPrice: cart.totalPrice});
  })
//#endregion
///////////////////////////////////////////////////////
//#region [rgba (5,55,55, 0.1)] Checkout 
  router.get('/checkout', isLoggedIn, function(req, res, next){
    if (!req.session.cart) {
      return res.redirect('shop/shoppingCart');
    } 
    let cart = new Cart(req.session.cart);

    res.render('shop/checkout', {total: cart.totalPrice});

  });

  router.post('/checkout', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
      return res.redirect('shop/shoppingCart');
    }

    let cart = new Cart(req.session.cart);

    // console.log("cart: " )
    // console.log(req.session.cart)

    let order = new Order({
      email: req.session.email,
      cart: cart,
      name: req.body.name,
      address: req.body.address,
      creditCard: req.body.creditCard
    });

    // console.log("order: " )
    // console.log(order)

    order.save()
      .then(()=>{
        req.session.cart = null;
        res.redirect('/');
      })
      .catch(function(err){
          console.log(err);
      })

  });



//#endregion

// export const logedInObj = 'logedInObj';


module.exports = router;
