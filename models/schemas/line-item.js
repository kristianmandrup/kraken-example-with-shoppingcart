var mongoose = require('mongoose');
var productSchema = require('./product');

//Define a super simple schema for our products.
var lineItemSchema = mongoose.Schema({
    id: String,
    price: Number, // including any rebates
    qty: Number,
    products: [productSchema]
});

lineItemSchema.methods.product = function() {
  return this.items[0];
}

lineItemSchema.methods.setProduct = function(product) {
  this.products = this.products || [];
  console.log('set product', product);
  console.log(this.products);
  if (this.products.length == 0) {
    console.log('push it!');
    this.products.push(product);
  }
  this.updatePrice();
}

lineItemSchema.methods.updatePrice = function() {
  console.log('update price!');
  this.price = this.qty * this.products[0].price / 2;
}

lineItemSchema.post('save', function (next) {
  console.log('post save!');
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
