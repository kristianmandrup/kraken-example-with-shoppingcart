var mongoose = require('mongoose');

var payerSchema = mongoose.Schema({
    firstName: String,
    lastName: String
});

module.exports = payerSchema;
