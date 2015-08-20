'use strict';

var mongoose = require('mongoose');
var productSchema = require('./schemas/product');

var productModel = function () {
    return mongoose.model('Product', productSchema);
};

module.exports = new productModel();
