'use strict';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
/**
 * MultiDeviceHover
 */
var MultiDeviceHover = /** @class */ (function () {
    function MultiDeviceHover() {
    }
    /**
     * init
     * @param elements -targetElement by document.queryselectorAll();
     * @param options
     */
    MultiDeviceHover.init = function (elements, options) {
        if (typeof elements !== 'object' || elements.length === 0)
            return;
        MultiDeviceHover.options = __assign({ 
            // defaulr options
            hoverClass: 'is-hover', onEnter: function (el) { return el; }, onLeave: function (el) { return el; }, onDestroy: function (els) { return els; } }, options);
        var enterEvent = MultiDeviceHover.isTouch ? 'touchstart' : 'mouseenter';
        var leaveEvent = MultiDeviceHover.isTouch ? 'touchend' : 'mouseleave';
        Array.prototype.slice.call(elements).forEach(function (element) {
            element.addEventListener(enterEvent, MultiDeviceHover.enterLisner, false);
            element.addEventListener(leaveEvent, MultiDeviceHover.leaveLisner, false);
        });
    };
    /**
     * remove hover event
     * @param elements
     */
    MultiDeviceHover.destroy = function (elements) {
        if (typeof elements !== 'object' || elements.length === 0)
            return;
        var enterEvent = MultiDeviceHover.isTouch ? 'touchstart' : 'mouseenter';
        var leaveEvent = MultiDeviceHover.isTouch ? 'touchend' : 'mouseleave';
        Array.prototype.slice.call(elements).forEach(function (element) {
            element.removeEventListener(enterEvent, MultiDeviceHover.enterLisner, false);
            element.removeEventListener(leaveEvent, MultiDeviceHover.leaveLisner, false);
        });
        MultiDeviceHover.options.onDestroy(elements);
    };
    /**
     * on mouse enter
     * @param event
     */
    MultiDeviceHover.enterLisner = function (event) {
        var element = event.target;
        element.classList.add(MultiDeviceHover.options.hoverClass);
        MultiDeviceHover.options.onEnter(element, event);
    };
    /**
     * on mouse leave
     * @param event
     */
    MultiDeviceHover.leaveLisner = function (event) {
        var element = event.target;
        element.classList.remove(MultiDeviceHover.options.hoverClass);
        MultiDeviceHover.options.onLeave(element, event);
    };
    MultiDeviceHover.options = {};
    MultiDeviceHover.isTouch = 'ontouchstart' in window;
    return MultiDeviceHover;
}());
exports["default"] = MultiDeviceHover;
