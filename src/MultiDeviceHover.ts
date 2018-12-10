'use strict';
// Param: options object
interface OptionEntity {
    hoverClass?: any;
    onEnter?: Function;
    onLeave?: Function;
    onDestroy?: Function;
}
// extends Dom
interface HoverElement extends Element {
    _mdhOptions?: OptionEntity;
}
// fix mouseEvent.target
interface CustomEvent<T extends HoverElement> extends Event {
    target: T;
}

/**
 * MultiDeviceHover
 */
export default class MultiDeviceHover {
    private static options: OptionEntity = {};
    private static isTouch: boolean = 'ontouchstart' in window;
    /**
     * init
     * @param elements -targetElement by document.queryselectorAll();
     * @param options
     */
    static init(elements: NodeListOf<HoverElement>, options?: OptionEntity): void {
        if (
            typeof elements !== 'object' ||
            elements.length === 0 ||
            typeof elements.item !== 'function'
        ) {
            console.error('@param:Elements is required');
            return;
        }
        MultiDeviceHover.options = {
            // defaulr options
            hoverClass: 'is-hover',
            onEnter: el => el,
            onLeave: el => el,
            onDestroy: els => els,
            ...options
        };
        const enterEvent: string = MultiDeviceHover.isTouch ? 'touchstart' : 'mouseenter';
        const leaveEvent: string = MultiDeviceHover.isTouch ? 'touchend' : 'mouseleave';
        Array.prototype.slice.call(elements).forEach(element => {
            element._mdhOptions = MultiDeviceHover.options;
            element.addEventListener(enterEvent, MultiDeviceHover.enterLisner, false);
            element.addEventListener(leaveEvent, MultiDeviceHover.leaveLisner, false);
        });
    }
    /**
     * remove hover event
     * @param elements
     */
    static destroy(elements: NodeListOf<HoverElement>) {
        if (
            typeof elements !== 'object' ||
            elements.length === 0 ||
            typeof elements.item !== 'function'
        ) {
            console.error('@param:Elements is required');
            return;
        }
        const enterEvent: string = MultiDeviceHover.isTouch ? 'touchstart' : 'mouseenter';
        const leaveEvent: string = MultiDeviceHover.isTouch ? 'touchend' : 'mouseleave';
        Array.prototype.slice.call(elements).forEach(element => {
            delete element._mdhOptions;
            element.removeEventListener(enterEvent, MultiDeviceHover.enterLisner, false);
            element.removeEventListener(leaveEvent, MultiDeviceHover.leaveLisner, false);
        });
        MultiDeviceHover.options.onDestroy(elements);
    }
    /**
     * on mouse enter
     * @param event
     */
    private static enterLisner(event: CustomEvent<HTMLInputElement>): void {
        const element: HoverElement = event.target;
        if (Array.isArray(element._mdhOptions.hoverClass)) {
            element.classList.add(...element._mdhOptions.hoverClass);
        } else {
            element.classList.add(element._mdhOptions.hoverClass);
        }
        element._mdhOptions.onEnter(element, event);
    }
    /**
     * on mouse leave
     * @param event
     */
    private static leaveLisner(event: CustomEvent<HTMLInputElement>): void {
        const element: HoverElement = event.target;
        if (Array.isArray(element._mdhOptions.hoverClass)) {
            element.classList.remove(...element._mdhOptions.hoverClass);
        } else {
            element.classList.remove(element._mdhOptions.hoverClass);
        }
        element._mdhOptions.onLeave(element, event);
    }
}
