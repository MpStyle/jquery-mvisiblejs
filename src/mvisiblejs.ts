/// <reference path="mvisiblejs.d.ts" />

(function ($) {
    class MVisibleJSOption {
        public completely:boolean = false;
        public hidden:boolean = false;
        public direction:string = 'both';
    }

    /**
     * An infinite scrool plugin for jQuery. Will be execute a callback whenever an element will be visible in the screen
     */
    class MVisibleJS {
        private static $w:JQuery = $(window);
        private elem:Element;
        private callback:()=>void;
        private options:MVisibleJSOption = new MVisibleJSOption;

        constructor(elem:Element, callback:()=>void, options?:MVisibleJSOption) { // completely?:boolean, hidden?:boolean, direction?:string) {
            let me = this;

            this.options = $.extend({}, me.options, options);
            this.elem = elem;
            this.callback = callback;

            MVisibleJS.$w.scroll(function () {
                me.run();
            });
        }

        public run() {
            if (this.isVisible()) {
                this.callback.call(this);
            }
        }

        /**
         *
         * @returns {boolean}
         */
        private isVisible():boolean {
            let $t:JQuery = $(this.elem).length > 1 ? $(this.elem).eq(0) : $(this.elem),
                t:HTMLElement = $t.get(0),
                vpWidth:number = MVisibleJS.$w.width(),
                vpHeight:number = MVisibleJS.$w.height(),
                clientSize:number|boolean = this.options.hidden === true ? t.offsetWidth * t.offsetHeight : true,
                viewTop = MVisibleJS.$w.scrollTop(),
                viewBottom = viewTop + vpHeight,
                viewLeft = MVisibleJS.$w.scrollLeft(),
                viewRight = viewLeft + vpWidth,
                offset = $t.offset(),
                _top = offset.top,
                _bottom = _top + $t.height(),
                _left = offset.left,
                _right = _left + $t.width(),
                compareTop = !this.options.completely === true ? _bottom : _top,
                compareBottom = !this.options.completely === true ? _top : _bottom,
                compareLeft = !this.options.completely === true ? _right : _left,
                compareRight = !this.options.completely === true ? _left : _right;

            if (this.options.direction === 'both')
                return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop)) && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
            else if (this.options.direction === 'vertical')
                return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop));
            else if (this.options.direction === 'horizontal')
                return !!clientSize && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
        }
    }

    $.fn.mvisiblejs = function (callback:()=>void, options?:MVisibleJSOption) {
        //noinspection TypeScriptUnresolvedFunction
        return this.each(function (index:number, elem:Element) {
            (new MVisibleJS(elem, callback, options)).run();
        });
    };

})(jQuery);
