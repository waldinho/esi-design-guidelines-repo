var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Init locals
    locals.section = 'independenthub';
    locals.filters = {
        category: req.params.category,
    };
    locals.data = {
        independentposts: [],
        indepenentcategories: [],
    };

    // Load all indepenentcategories
    view.on('init', function(next) {

        keystone.list('IndependentPostCategory').model.find().sort('name').exec(function(err, results) {

            if (err || !results.length) {
                return next(err);
            }

            locals.data.indepenentcategories = results;

            // Load the counts for each category
            async.each(locals.data.indepenentcategories, function(category, next) {

                keystone.list('IndependentPost').model.count().where('indepenentcategories').in([category.id]).exec(function(err, count) {
                    category.postCount = count;
                    next(err);
                });

            }, function(err) {
                next(err);
            });
        });
    });

    // Load the current category filter
    view.on('init', function(next) {

        if (req.params.category) {
            keystone.list('IndependentPostCategory').model.findOne({ key: locals.filters.category }).exec(function(err, result) {
                locals.data.category = result;
                next(err);
            });
        } else {
            next();
        }
    });

    // Load the indepenentposts
    view.on('init', function(next) {

        var q = keystone.list('IndependentPost').paginate({
                independent: req.query.independent || 1,
                perPage: 10,
                maxPages: 10,
                filters: {
                    state: 'published',
                },
            })
            .sort('-publishedDate')
            .populate('author indepenentcategories');

        if (locals.data.category) {
            q.where('indepenentcategories').in([locals.data.category]);
        }

        q.exec(function(err, results) {
            locals.data.indepenentposts = results;
            next(err);
        });
    });

    // Render the view
    view.render('independenthub');
};