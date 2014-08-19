$(function() {
    App.View.Sticker = Backbone.View.extend({
        tagName: 'div',
        className: 'sticker',
        template: _.template($('#stickerTmpl').html()),

        initialize: function() {
            var draggie = new Draggabilly(this.el, {
                    containment: true
                }),
                sticker = this,
                PARENTOFFSET = 9;

            draggie
                .on('dragStart', function(draggie, e) {
                    sticker.toTop(e);
                })
                .on('dragEnd', function(draggie, e) {
                    sticker.model.save({
                        top: $(this.element).offset().top - PARENTOFFSET,
                        left: $(this.element).offset().left - PARENTOFFSET
                    });
                });

            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
        },

        events: {
            contextmenu: 'removeSticker',
            'dblclick .sticker-title': function() {
                this.toggleEditMode('title');
            },
            'dblclick .sticker-text': function() {
                this.toggleEditMode('text');
            },
            click: 'toTop'
        },

        toggleEditMode: function(type) {
            var sticker = this;

            $('#stickersBoard').addClass('editing');

            this.$el.find('.sticker-'+type).hide();
            this.$el.find('.sticker-'+type+'-editable')
                .show().trigger('focus').trigger('select')
                .one('blur', function(e) {
                    var valToSet = $(this).val();
                    e.stopPropagation();
                    if (valToSet) {
                        sticker.model.set(type, valToSet).save();
                    }
                    sticker.$el.find('.sticker-'+type).show();
                    $(this).hide();
                });
        },

        render: function(e) {
            var template = this.template(this.model.toJSON());

            this.$el
                .css('top', this.model.get('top'))
                .css('left', this.model.get('left'))
                .prop('title', this.model.get('text'))
                .html(template);

            return this;
        },

        removeSticker: function() {
            this.model.destroy();
        },

        toTop: function(e) {
            e.stopPropagation();
            $('.sticker').removeClass('on-top');
            this.$el.addClass('on-top');
        }
    });
});