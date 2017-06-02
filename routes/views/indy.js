var keystone = require('keystone');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Set locals
    locals.section = 'blog';
    locals.filters = {
        indy: req.params.indy,
    };
    locals.data = {
        indys: [],
    };

    // Load the current indy
    view.on('init', function(next) {

        var q = keystone.list('IndyPost').model.findOne({
            state: 'published',
            slug: locals.filters.indy,
        }).populate('author categories');

        q.exec(function(err, result) {
            locals.data.indy = result;
            next(err);
        });

    });

    // Load other indys
    view.on('init', function(next) {

        var q = keystone.list('IndyPost').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');

        q.exec(function(err, results) {
            locals.data.indys = results;
            next(err);
        });

    });

    // Render the view
    view.render('indy');
};