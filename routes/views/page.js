var keystone = require('keystone');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Set locals
    locals.data = {
        page: {}
    };

    // Load the current page
    view.on('init', function(next) {

        var q = keystone.list('Page').model.findOne({
            state: 'published',
            slug: req.params.page,
        }).exec(function(err, result) {
            if (!result) {
                res.status(404).render('errors/404.html');
            } else {
                locals.data.page = result;
                next(err);
            }
        });

    });

    // Render the view
    view.render('page');
};