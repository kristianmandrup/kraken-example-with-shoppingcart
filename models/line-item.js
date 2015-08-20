'use strict';

var mongoose = require('mongoose');
var lineItemSchema = require('./schemas/line-item');
// var lineItemSchema = require('./schemas/product');
console.log('lineItemSchema', lineItemSchema);

var lineItemModel = function () {
    return mongoose.model('LineItem', lineItemSchema);
};

module.exports = new lineItemModel();
