$(function() {
    App.Model.Sticker = Backbone.Model.extend({
        defaults: {
            title: 'New sticker',
            text: 'Double-click here to edit sticker text.'
        }
    });
});