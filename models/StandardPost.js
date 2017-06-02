var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * IndependentPost Model
 * ==========
 */

var StandardPost = new keystone.List('StandardPost', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true },
});

StandardPost.add({
    title: { type: String, required: true },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    author: { type: Types.Relationship, ref: 'Users', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
    image: { type: Types.CloudinaryImage },
    content: {
        brief: { type: Types.Html, wysiwyg: true, height: 150 },
        extended: { type: Types.Html, wysiwyg: true, height: 400 },
    },
    categories: { type: Types.Relationship, ref: 'StandardPostCategory', many: true },
});

StandardPost.schema.virtual('content.full').get(function() {
    return this.content.extended || this.content.brief;
});

StandardPost.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
StandardPost.register();