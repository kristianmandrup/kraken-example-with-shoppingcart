'use strict';

var mongoose = require('mongoose');

var orderSchema = require('./schemas/order');

var orderModel = function () {
    return mongoose.model('Order', orderSchema);
};

module.exports = new orderModel();
