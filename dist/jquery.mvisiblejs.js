(function ($) {
    var MVisibleJSOption = (function () {
        function MVisibleJSOption() {
            this.completely = false;
            this.hidden = false;
            this.direction = 'both';
            this.scrollableElement = window;
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
            $(this.options.scrollableElement).scroll(function () {
                me.run();
            });
        }
        MVisibleJS.prototype.run = function () {
            if (this.isVisible()) {
                this.callback.call(this);
            }
        };
        MVisibleJS.prototype.isVisible = function () {
            var $t = $(this.elem).length > 1 ? $(this.elem).eq(0) : $(this.elem), t = $t.get(0), vpWidth = $(this.options.scrollableElement).width(), vpHeight = $(this.options.scrollableElement).height(), clientSize = this.options.hidden === true ? t.offsetWidth * t.offsetHeight : true, viewTop = $(this.options.scrollableElement).scrollTop(), viewBottom = viewTop + vpHeight, viewLeft = $(this.options.scrollableElement).scrollLeft(), viewRight = viewLeft + vpWidth, offset = $t.offset(), _top = offset.top, _bottom = _top + $t.height(), _left = offset.left, _right = _left + $t.width(), compareTop = !this.options.completely === true ? _bottom : _top, compareBottom = !this.options.completely === true ? _top : _bottom, compareLeft = !this.options.completely === true ? _right : _left, compareRight = !this.options.completely === true ? _left : _right;
            switch (this.options.direction) {
                case 'both':
                    return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop)) && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
                case 'vertical':
                    return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop));
                case 'horizontal':
                    return !!clientSize && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
            }
        };
        return MVisibleJS;
    }());
    $.fn.mvisiblejs = function (callback, options) {
        return this.each(function (index, elem) {
            (new MVisibleJS(elem, callback, options)).run();
        });
    };
})(jQuery);
