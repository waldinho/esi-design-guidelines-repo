var keystone = require('keystone');

/**
 * PostCategory Model
 * ==================
 */

var PostCategory = new keystone.List('IndependentPostCategory', {
    autokey: { from: 'name', path: 'key', unique: true },
});

PostCategory.add({
    name: { type: String, required: true },
});

PostCategory.relationship({ ref: 'IndependentPost', path: 'independent-posts', refPath: 'categories' });

PostCategory.register();