modules.define('slider', ['jquery', 'i-bem__dom'], function(provide, $, BEMDOM) {

provide(BEMDOM.decl('slider',
{
    onSetMod: {
        js: {
            inited: function() {
				
				this.bindTo('mouseenter', this._onEnter);
                this.bindTo('mouseleave', this._onLeave);


                this.bindTo('control', 'click', function(e) {
                    this[this.getMod($(e.currentTarget), 'slide') == 'right' ? 'next' : 'prev']();
                });
            }
        }
    },
	
	_onEnter: function() {
		this.setMod(this.elem('control'), 'status', 'on');
	},
	_onLeave: function() {
		this.setMod(this.elem('control'), 'status', 'off');
	},

    getCurrentSlideIndex: function() {
        var active = this.findElem('item', 'state', 'active');
        return this.elem('item').index(active);
    },

    next: function() {
      if (this.sliding) return;
      return this.slide('next');
    },

    prev: function() {
      if (this.sliding) return;
      return this.slide('prev');
    },

    slide: function(type, next) {
        var _this = this,
            active = this.findElem('item', 'state', 'active'),
            next = next || active[type](),
            fallback  = type == 'next' ? 'first' : 'last';

        this.sliding = true;

        next = next.length ? next : this.elem('item')[fallback]();

        if (this.hasMod(next, 'state', 'active')) return;

        var nextIdx = this.elem('item').index(next);

            this.emit('slide', {
                relatedTarget: next[0]
            });

            this
                .delMod(active, 'state')
                .setMod(next, 'state', 'active')
                .emit('slid', { currentSlideIndex: nextIdx })
                .sliding = false;
      
        return this;
    }



}));

});