$(function() {
    var BOARDSIZE = 500,
        STICKERSIZE = 100;

    App.View.Stickers = Backbone.View.extend({
        el: '#stickersBoard',

        events: {
            click: 'createSticker',
            contextmenu: function(e) {
                e.preventDefault();
            }
        },

        initialize: function() {
            this.collection.on('add', this.addSticker, this);
            this.collection.on('reset', this.addStickers, this);
            this.collection.fetch();
        },

        addStickers: function() {
            this.collection.each(this.addSticker, this);
        },

        addSticker: function(sticker) {
            var stickerView = new App.View.Sticker({model: sticker});
            this.$el.append(stickerView.render().el);
        },

        createSticker: function(e) {
            if (this.$el.hasClass('editing')) {
                $('#stickersBoard').removeClass('editing');
                return;
            }
            var PARENTOFFSET = 9,
                left = ((BOARDSIZE-e.clientX) < STICKERSIZE) ?
                    e.clientX-(STICKERSIZE-(BOARDSIZE-e.clientX)) :
                    e.clientX - PARENTOFFSET,

                top = ((BOARDSIZE-e.clientY) < STICKERSIZE) ?
                    e.clientY-(STICKERSIZE-(BOARDSIZE-e.clientY)) :
                    e.clientY - PARENTOFFSET;

            this.collection.create({
                top: top,
                left: left
            });
        }
    });
});