# MultiDeviceHover

Pure JavaScript library that add  `.is-hover` class instead of css `:hover` for mobile and desktop.  
  
[![NPM](https://nodei.co/npm/multi-device-hover.png?compact=true)](https://nodei.co/npm/multi-device-hover/)

## Usage

### Install

Using npm, install multi-device-hover  


```bash
$ npm install multi-device-hover --save
```

### Import

```javascript
import MultiDeviceHover from 'multi-device-hover';
```

or use stand-alone `dist/standalone/mdh.min.js`

```html
<script src="path/to/mdh.min.js"></script>
```
## Example
[> Examples](https://multi-device-hover.netlify.com/)

### Markup

```html
<a href="./" data-hover>button1</a> 
<a href="./" data-hover>button2</a>
```

### JS

```javascript
// * NodeList only
const hoverElements = document.querySelectorAll('[data-hover]');

// Default Options
MultiDeviceHover.init(hoverElements)
```
```javascript
// Custom Class
MultiDeviceHover.init(hoverElements,{
   hoverClass: 'is-custom-hover' // default "is-hover"
})
```
```javascript
// Multiple Classes
MultiDeviceHover.init(hoverElements,{
   hoverClass: ['is-hover', 'is-custom-hover'] 
})
```
```javascript
// Full Options
 MultiDeviceHover.init(hoverElements, {
    hoverClass : "is-hover",
    onEnter: (element,mouseEvent) => {
        console.log("Enter:");
        console.log(element,mouseEvent);
    },
    onLeave: (element,mouseEvent) => {
        console.log("Leave:");
        console.log(element,mouseEvent);
    },
    onDestroy: (element) => {
        console.log("Destoy:");
        console.log(element);
    }
});
```
```javascript
// Destroy - removeEventListener 
MultiDeviceHover.destroy(hoverElements)
```


## License

[MIT](https://opensource.org/licenses/MIT)
