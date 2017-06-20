'use strict';


var mongoose = require('mongoose'),
    Esi = mongoose.model('esi');

exports.list_all_esi = function(req, res) {
    Esi.find({}, function(err, esi) {
        if (err)
            res.send(err);
        res.json(esi);
    });
};


exports.create_a_esi = function(req, res) {
    var new_esi = new Esi(req.body);
    new_esi.save(function(err, esi) {
        if (err)
            res.send(err);
        res.json(esi);
    });
};


exports.read_a_esi = function(req, res) {
    Esi.findById(req.params.esiId, function(err, esi) {
        if (err)
            res.send(err);
        res.json(esi);
    });
};


exports.update_a_esi = function(req, res) {
    Esi.findOneAndUpdate(req.params.esiId, req.body, { new: true }, function(err, esi) {
        if (err)
            res.send(err);
        res.json(esi);
    });
};


exports.delete_a_esi = function(req, res) {

    Esi.remove({
        _id: req.params.esiId
    }, function(err, esi) {
        if (err)
            res.send(err);
        res.json({ message: 'Successfully deleted' });
    });
};