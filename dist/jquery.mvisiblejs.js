(function ($) {
    var MVisibleJSOption = (function () {
        function MVisibleJSOption() {
            this.completely = false;
            this.hidden = false;
            this.direction = 'both';
        }
        return MVisibleJSOption;
    }());
    var MVisibleJS = (function () {
        function MVisibleJS(elem, callback, options) {
            this.options = new MVisibleJSOption;
            var me = this;
            this.options = $.extend({}, me.options, options);
            this.elem = elem;
            this.callback = callback;
            MVisibleJS.$w.scroll(function () {
                me.run();
            });
        }
        MVisibleJS.prototype.run = function () {
            if (this.isVisible()) {
                this.callback.call(this);
            }
        };
        MVisibleJS.prototype.isVisible = function () {
            var $t = $(this.elem).length > 1 ? $(this.elem).eq(0) : $(this.elem), t = $t.get(0), vpWidth = MVisibleJS.$w.width(), vpHeight = MVisibleJS.$w.height(), clientSize = this.options.hidden === true ? t.offsetWidth * t.offsetHeight : true, viewTop = MVisibleJS.$w.scrollTop(), viewBottom = viewTop + vpHeight, viewLeft = MVisibleJS.$w.scrollLeft(), viewRight = viewLeft + vpWidth, offset = $t.offset(), _top = offset.top, _bottom = _top + $t.height(), _left = offset.left, _right = _left + $t.width(), compareTop = !this.options.completely === true ? _bottom : _top, compareBottom = !this.options.completely === true ? _top : _bottom, compareLeft = !this.options.completely === true ? _right : _left, compareRight = !this.options.completely === true ? _left : _right;
            if (this.options.direction === 'both')
                return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop)) && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
            else if (this.options.direction === 'vertical')
                return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop));
            else if (this.options.direction === 'horizontal')
                return !!clientSize && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
        };
        MVisibleJS.$w = $(window);
        return MVisibleJS;
    }());
    $.fn.mvisiblejs = function (callback, options) {
        return this.each(function (index, elem) {
            (new MVisibleJS(elem, callback, options)).run();
        });
    };
})(jQuery);
