var mongoose = require('mongoose');
var productSchema = require('./product');

//Define a super simple schema for our products.
var lineItemSchema = mongoose.Schema({
    name: String,
    price: Number, // including any rebates
    displayPrice: String,
    qty: Number,
    products: [productSchema]
});

lineItemSchema.methods.product = function() {
  return this.items[0];
}

lineItemSchema.methods.setProduct = function(product) {
  this.products = this.products || [];
  if (this.products.length == 0) {
    this.products.push(product);
    this.name = product.name;
  }
  this.updatePrice();
}

lineItemSchema.methods.updatePrice = function() {
  this.price = this.qty * this.products[0].price / 2;
  this.displayPrice = this.prettyPrice();
}

lineItemSchema.pre('save', function (next) {
  this.updatePrice();
  next();
});

lineItemSchema.methods.display = function () {
  return this.qty + ' x ' + product.display() + ' price: ' + this.price;
};

lineItemSchema.methods.prettyPrice = function () {
  return (this && this.price) ? '$' + this.price.toFixed(2) : '$';
};

module.exports = lineItemSchema;
