var mongoose = require('mongoose');

var lineItemSchema = require('./line-item');
var payerSchema = require('./payer');

var timestamps = require('mongoose-timestamp');

var orderSchema = mongoose.Schema({
    status: String,
    payers: [payerSchema],
    lineItems: [lineItemSchema]
});
orderSchema.plugin(timestamps);

//Verbose toString method
orderSchema.methods.display = function () {
  return this.lineItems.map(function(item) {
    return item.prettyPrice();
  }).join('\n');
};

// calc total price of all lineItems
orderSchema.methods.totalPrice = function () {
  return this.lineItems.reduce(function(pv, cv) { return pv.price + cv.price; }, 0);
};

module.exports = orderSchema;
