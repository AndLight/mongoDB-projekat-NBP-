var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    
    email: {type: String, required:true},
    cart: {type: Object, required: true},
    name: {type: String, required: true},
    address: {type: String, required: true},
    creditCard: {type: Number, required: true}
});

module.exports = mongoose.model('Order', schema);