// var productSchema = require('./product');

//Define a super simple schema for our products.
var lineItemSchema = mongoose.Schema({
    id: String,
    price: Number, // including any rebates
    qty: Number
    // product: productSchema
});

lineItemSchema.pre('save', function (next) {
  item.price = item.qty * item.price / 2;
  next();
});

//Verbose toString method
lineItemSchema.methods.display = function () {
  return this.qty ' x ' + product.display() + ' total price: ' + this.price;
};

//Format the price of the product to show a dollar sign, and two decimal places
lineItemSchema.methods.prettyPrice = function () {
  return (this && this.price) ? '$' + this.price.toFixed(2) : '$';
};

module.exports = lineItemSchema;
