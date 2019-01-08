'use strict';
/**
 * MultiDeviceHover
 * https://github.com/sk-rt/multi-device-hover
 *
 * Copyright (c) 2018  Ryuta Sakai
 * Licensed under the MIT license.
 */

// Param: options object
interface OptionEntity {
    hoverClass?: string | string[];
    onEnter?(element: HoverElement, event: Event): void;
    onLeave?(element: HoverElement, event: Event): void;
    onDestroy?(element: HoverElement): void;
}
// extends Dom
interface HoverElement extends Element {
    _mdhOptions?: OptionEntity;
}
export default class MultiDeviceHover {
    private static isTouch: boolean = 'ontouchstart' in window;
    /**
     * @param elements
     * @param options
     */
    static init(elements: NodeListOf<HoverElement>, options?: OptionEntity): void {
        if (
            typeof elements !== 'object' ||
            elements.length === 0 ||
            typeof elements.item !== 'function'
        ) {
            console.error('ERROR: param elements is required');
            return;
        }
        const _options: OptionEntity = {
            // defaulr options
            hoverClass: 'is-hover',
            onEnter: () => false,
            onLeave: () => false,
            onDestroy: () => false,
            ...options
        };
        const enterEvent: string = MultiDeviceHover.isTouch ? 'touchstart' : 'mouseenter';
        const leaveEvent: string = MultiDeviceHover.isTouch ? 'touchend' : 'mouseleave';
        Array.prototype.slice.call(elements).forEach(element => {
            element._mdhOptions = _options;
            element.addEventListener(enterEvent, enterLisner, false);
            element.addEventListener(leaveEvent, leaveLisner, false);
        });
    }
    /**
     * Remove event & property form Elements
     * @param elements
     */
    static destroy(elements: NodeListOf<HoverElement>) {
        if (
            typeof elements !== 'object' ||
            elements.length === 0 ||
            typeof elements.item !== 'function'
        ) {
            console.error('ERROR: param elements is required');
            return;
        }
        const enterEvent: string = MultiDeviceHover.isTouch ? 'touchstart' : 'mouseenter';
        const leaveEvent: string = MultiDeviceHover.isTouch ? 'touchend' : 'mouseleave';
        Array.prototype.slice.call(elements).forEach(element => {
            element.removeEventListener(enterEvent, enterLisner, false);
            element.removeEventListener(leaveEvent, leaveLisner, false);
            element._mdhOptions.onDestroy(element);
            delete element._mdhOptions;
        });
    }
}
/**
 * on mouse/touch enter
 * @param event
 */
function enterLisner(event: Event): void {
    const element: HoverElement = this;
    if (Array.isArray(element._mdhOptions.hoverClass)) {
        element.classList.add(...element._mdhOptions.hoverClass);
    } else {
        element.classList.add(element._mdhOptions.hoverClass);
    }
    element._mdhOptions.onEnter(element, event);
}
/**
 * on mouse/touch leave
 * @param event
 */
function leaveLisner(event: Event): void {
    const element: HoverElement = this;
    if (Array.isArray(element._mdhOptions.hoverClass)) {
        element.classList.remove(...element._mdhOptions.hoverClass);
    } else {
        element.classList.remove(element._mdhOptions.hoverClass);
    }
    element._mdhOptions.onLeave(element, event);
}
