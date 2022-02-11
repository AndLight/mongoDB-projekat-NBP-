// let passport        = require('passport');
// let LocalStrategy   = require('passport-local').Strategy;
// let User            = require('../models/user');
// let bcrypt          = require('bcrypt');

// function initialize(passport, getUserByEmail, getUserById) {
//     const authenticateUser = async (email, password, done) => {
//       const user = getUserByEmail(email)
//       if (user == null) {
//         return done(null, false, { message: 'No user with that email' })
//       }
  
//       try {
//         if (await bcrypt.compare(password, user.password)) {
//           return done(null, user)
//         } else {
//           return done(null, false, { message: 'Password incorrect' })
//         }
//       } catch (e) {
//         return done(e)
//       }
//     }
  
//     passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
//     passport.serializeUser((user, done) => done(null, user.id))
//     passport.deserializeUser((id, done) => {
//       return done(null, getUserById(id))
//     })
//   }

// function initialize(passport, getUserByEmail){
//     const authenticateUser = (email, password, done)=>{
//         const user = getUserByEmail(email);
//         if(user ==null){
//             return done(null, false, {message: "No user found (email)"})
//         }

//         // try{
//             if( bcrypt.compare(password, user.password)){
//                 done(null, user)
//             }else{
//                 return done(null, false, {message: "Password incorrect"})
//             }
//         // }
//         // catch (err){
//         //     return(err)
//         // }
//     }

//     passport.use(new LocalStrategy({usernameField: 'email'}), 
//     authenticateUser)
    
//     passport.serializeUser(function (user, done){
//         done(null, user.id);
//     });       //how to store user in the session, serialize it by ID, null je error case
    
//     passport.deserializeUser(function(id, done){
//         User.findById(id, function(err, user){
//             done(err, user);
//         });
//     });

//     console.log("pasport started")
// }

module.exports = {initialize: initialize};