var mongoose = require('mongoose');

var lineItemSchema = require('./line-item');

//Define a super simple schema for our products.
var orderSchema = mongoose.Schema({
    id: String,
    status: String,
    lineItems: [lineItemSchema]
});

//Verbose toString method
orderSchema.methods.display = function () {
  return this.lineItems.map(function(item) {
    return item.prettyPrice();
  }).join('\n');
};

//Format the price of the product to show a dollar sign, and two decimal places
orderSchema.methods.totalPrice = function () {
  return this.lineItems.reduce(function(pv, cv) { return pv.price + cv.price; }, 0);
};

module.exports = orderSchema;
