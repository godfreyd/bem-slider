modules.define('slider', ['jquery', 'i-bem__dom'], function(provide, $, BEMDOM) {
/* 
	метод decl объекта BEM указывает для какого блока делается декларация. 
	
	Первым параметром указывается имя блока, далее
    {
        методы экземпляра (динамические методы)
    },
    {
        статические методы 
    }
    
*/
provide(BEMDOM.decl('slider',  
{
    onSetMod: { // служебное свойство onSetMod реализует возможность реагировать на появление или исчезновение модификаторов
	
        js: { // указываем модификатор
            inited: function() { // значение inited (таким образом реализуем что-то  вроде $( document ).ready() ). 
				/* инициализация обработчиков событий на кнопках и запуск update */
				
				/* метод bindTo умеет слушать события на блоке, вложенных в блок элементах и реагировать на них */
				this.bindTo('mouseenter', this.onEnter);
                this.bindTo('mouseleave', this.onLeave);

				// находим кнопки и на события клик вызываем колбэк. 
                this.bindTo(this.elem('control'), 'click', function(e) { // метод this.elem кэшируемый
				// так как кнопок две мы определяем чему равно значение модификатора элемента slide по которому кликнули
					this[this.getMod($(e.currentTarget), 'slide') == 'right' ? 'next' : 'prev']();
                });
				
				this.update();
	
            }
        }
    },

	update: function() {
		var nextIdx = localStorage["saveIdx"];
		if (nextIdx) {
			this.setMod(this.elem('item').eq(nextIdx), 'state', 'active');
		} else {
			this.setMod(this.elem('item').eq(0), 'state', 'active');
		}
		
	},
	
	onEnter: function() {
		this.setMod(this.elem('control'), 'status', 'on');
	},
	
	onLeave: function() {
		this.setMod(this.elem('control'), 'status', 'off');
	},

    next: function() {
		/* переход к следующему слайду */
		if (this.sliding) return;
		return this.slide('next');
    },

    prev: function() {
		/* переход к предыдущему слайду */
		if (this.sliding) return;
		return this.slide('prev');
    },

    slide: function(type) {
        var active = this.findElem('item', 'state', 'active'), // находим текущий активный элемент
            next = next || active[type](), // находим следующий
            fallback  = type == 'next' ? 'first' : 'last';

        this.sliding = true; // флаг

        next = next.length ? next : this.elem('item')[fallback](); // если следующий не понятный, то позовем обычную jquery функцию и определим следующий item

        if (this.hasMod(next, 'state', 'active')) return; // перерабатываем если у следующего item есть модификатор state_active

        var nextIdx = this.elem('item').index(next); // определяем индекс следующей картинки 0,1,2,3,4
		
		localStorage["saveIdx"] = nextIdx; // сохраняем данный индекс
		
		this
			.delMod(active, 'state')
			.setMod(next, 'state', 'active')
			.sliding = false;
      
        return this;
    }



}));

});