var express = require('express');
var router = express.Router();
var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function(err, result){

    // console.log(result)
    let bookArr=[];
    // let rowSize = 3;
    let brojac = 0;
    result.forEach(e =>{
      bookArr.push(e);
      console.log(brojac+" e: "+e.imagePath)
      brojac++;
    })

    // for (let i=0; i<result.length; i+= rowSize){
    //   bookArr.push(result.slice(i, i + rowSize));
    // }

    res.render('shop/index', { title: 'MongoDB project', books: bookArr });
    
    if(err){console.log('Error: '+err)}

  });
});

module.exports = router;
