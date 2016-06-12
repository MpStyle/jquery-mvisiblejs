# jQuery - MVisibleJS
An infinite scrool plugin for jQuery. Will be execute a callback whenever an element will be visible in the screen

## Using
```html
<script type="text/javascript" src="dist/jquery-mvisiblejs.min.js"></script>
```

For a full example which explains how to use the library see _test_ folder.

```html

<div class="container"></div>
<div class="loader"></div>

<script>
$(".loader", {
    completely: false,  // if true, run the callback function only if the ".loader" element is completely visible
    hidden: false,      // if true, run the callback also if the element is not visible
    direction: 'both',  // 
}).mvisiblejs(function () {
    // do something
}); 
</script>

```

## Development
- Clone the repository
- Install NPM
- Install dev dependencies
```
npm install typings --global
```
- In the root of the project run:
```
npm install
```
And
```
typings install --ambient
```
To build run:
```
grunt
```

## History
- 0.0.5 - Added the option _scrollableElement_ to define what is the scrollable element on which calculate the offsets. 