$(function() {
	App.Collection.Stickers = Backbone.Collection.extend({
		model: App.Model.Sticker,
		localStorage: new Backbone.LocalStorage('Stickers')
	});
});