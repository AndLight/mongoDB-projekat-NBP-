var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({

    imagePath: {type: String, reqired: true},
    title: {type: String, reqired: true},
    description: {type: String, reqired: true},
    writer: {type: String, reqired: true},
    year: {type: Number, reqired: true},
    price: {type: Number, reqired: true}
});

module.exports = mongoose.model('Product', schema);