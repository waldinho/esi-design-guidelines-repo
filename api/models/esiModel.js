'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var esiSchema = new Schema({
    name: {
        type: String,
        Required: 'Kindly enter the name'
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('esi', esiSchema);