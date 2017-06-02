var keystone = require('keystone');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Set locals
    locals.section = 'blog';
    locals.filters = {
        standard: req.params.standard,
    };
    locals.data = {
        standards: [],
    };

    // Load the current standard
    view.on('init', function(next) {

        var q = keystone.list('StandardPost').model.findOne({
            state: 'published',
            slug: locals.filters.standard,
        }).populate('author categories');

        q.exec(function(err, result) {
            locals.data.standard = result;
            next(err);
        });

    });

    // Load other standards
    view.on('init', function(next) {

        var q = keystone.list('StandardPost').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');

        q.exec(function(err, results) {
            locals.data.standards = results;
            next(err);
        });

    });

    // Render the view
    view.render('standard');
};