var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Page Model
 * ==========
 */

var Page = new keystone.List('Page', {
    autokey: { path: 'slug', from: 'title', unique: true },
});

Page.add({
    title: { type: String, initial: true, required: true },
    state: { type: Types.Select, options: 'draft, published', default: 'draft', index: true },
    content: { type: Types.Html, wysiwyg: true, height: 400 },
});

Page.defaultColumns = 'title, state|20%, slug|20%';
Page.register();