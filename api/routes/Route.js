'use strict';
module.exports = function(app) {
    var esiList = require('../controllers/Controller');


    // esiList Routes
    app.route('/esi')
        .get(esiList.list_all_esi)
        .post(esiList.create_a_esi);


    app.route('/esi/:esiId')
        .get(esiList.read_a_esi)
        .put(esiList.update_a_esi)
        .delete(esiList.delete_a_esi);
};