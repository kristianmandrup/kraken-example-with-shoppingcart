'use strict';

var mongoose = require('mongoose');
var lineItemSchema = require('./schemas/line-item');

var lineItemModel = function () {
    return mongoose.model('LineItem', lineItemSchema);
};

module.exports = new lineItemModel();
