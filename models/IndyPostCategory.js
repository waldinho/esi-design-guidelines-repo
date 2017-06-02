var keystone = require('keystone');

/**
 * PostCategory Model
 * ==================
 */

var PostCategory = new keystone.List('IndyPostCategory', {
    autokey: { from: 'name', path: 'key', unique: true },
});

PostCategory.add({
    name: { type: String, required: true },
});

PostCategory.relationship({ ref: 'IndyPost', path: 'indy-posts', refPath: 'categories' });

PostCategory.register();