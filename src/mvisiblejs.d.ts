// Type definitions for jQuery MVisibleJS
// Project: https://github.com/MpStyle/jquery-mvisiblejs

interface MVisibleJSOption{}

interface JQuery {
    mvisiblejs(callback:()=>void, options?:MVisibleJSOption): JQuery;
}