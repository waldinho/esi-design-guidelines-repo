var keystone = require('keystone');

/**
 * PostCategory Model
 * ==================
 */

var PostCategory = new keystone.List('StandardPostCategory', {
    autokey: { from: 'name', path: 'key', unique: true },
});

PostCategory.add({
    name: { type: String, required: true },
});

PostCategory.relationship({ ref: 'StandardPost', path: 'standard-posts', refPath: 'categories' });

PostCategory.register();