var keystone = require('keystone');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Set locals
    locals.section = 'blog';
    locals.filters = {
        independent: req.params.independent,
    };
    locals.data = {
        independents: [],
    };

    // Load the current independent
    view.on('init', function(next) {

        var q = keystone.list('IndependentPost').model.findOne({
            state: 'published',
            slug: locals.filters.independent,
        }).populate('author categories');

        q.exec(function(err, result) {
            locals.data.independent = result;
            next(err);
        });

    });

    // Load other independents
    view.on('init', function(next) {

        var q = keystone.list('IndependentPost').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');

        q.exec(function(err, results) {
            locals.data.independents = results;
            next(err);
        });

    });

    // Render the view
    view.render('independent');
};