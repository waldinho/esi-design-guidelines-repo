var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * IndependentPost Model
 * ==========
 */

var IndependentPost = new keystone.List('IndependentPost', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true },
});

IndependentPost.add({
    title: { type: String, required: true },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    author: { type: Types.Relationship, ref: 'Users', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
    image: { type: Types.CloudinaryImage },
    content: {
        brief: { type: Types.Html, wysiwyg: true, height: 150 },
        extended: { type: Types.Html, wysiwyg: true, height: 400 },
    },
    categories: { type: Types.Relationship, ref: 'IndependentPostCategory', many: true },
});

IndependentPost.schema.virtual('content.full').get(function() {
    return this.content.extended || this.content.brief;
});

IndependentPost.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
IndependentPost.register();