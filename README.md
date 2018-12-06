# MultiDeviceHover

Pure JavaScript library that add  `.is-hover` class instead of css `:hover` for mobile and desktop.

## Usage

### Install

Using npm, install multi-device-hover  
[> npm](https://www.npmjs.com/package/multi-device-hover)

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

// Full Options
 MultiDeviceHover.init(hoverElements, {
    hoverClass : "is-hover" // default "is-hover"
    onEnter: (element,mouseEvent) => {
        console.log("Enter:");
        console.log(element,mouseEvent);
    },
    onLeave: (element,mouseEvent) => {
        console.log("Enter:");
        console.log(element,mouseEvent);
    }
});

// Destroy - removeEventListener 
MultiDeviceHover.destroy(hoverElements)

```


## License

[MIT](https://opensource.org/licenses/MIT)
