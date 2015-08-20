var mongoose = require('mongoose');

//Define a super simple schema for our products.
var productSchema = mongoose.Schema({
    name: String,
    price: Number
});

//Verbose toString method
productSchema.methods.whatAmI = function () {
    var name = this.name || 'Unidentified product';
    return name + ' worth ' + this.prettyPrice();
};

//Format the price of the product to show a dollar sign, and two decimal places
productSchema.methods.prettyPrice = function () {
    return (this && this.price) ? '$' + this.price.toFixed(2) : '$';
};

module.exports = productSchema;
