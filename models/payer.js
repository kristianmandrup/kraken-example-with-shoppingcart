'use strict';

var mongoose = require('mongoose');

var payerSchema = require('./schemas/payer');

var payerModel = function () {
    return mongoose.model('Payer', payerSchema);
};

module.exports = new payerModel();
