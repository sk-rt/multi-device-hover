'use strict';
interface OptionEntity {
    hoverClass?: string;
    onEnter?: Function;
    onLeave?: Function;
}
interface HTMLElementEvent<T extends HTMLElement> extends Event {
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
    static init(elements: NodeListOf<Element>, options?: OptionEntity): void {
        if (typeof elements !== 'object' || elements.length === 0) return;
        MultiDeviceHover.options = {
            // defaulr options
            hoverClass: 'is-hover',
            onEnter: element => element,
            onLeave: element => element,
            ...options
        };

        const enterEvent: string = MultiDeviceHover.isTouch ? 'touchstart' : 'mouseenter';
        const leaveEvent: string = MultiDeviceHover.isTouch ? 'touchend' : 'mouseleave';
        Array.prototype.slice.call(elements).forEach(element => {
            element.addEventListener(enterEvent, MultiDeviceHover.enterLisner, false);
            element.addEventListener(leaveEvent, MultiDeviceHover.leaveLisner, false);
        });
    }
    /**
     * remove hover event
     * @param elements
     */
    static destroy(elements: NodeListOf<Element>) {
        if (elements !== undefined || elements.length === 0) return;
        const enterEvent: string = MultiDeviceHover.isTouch ? 'touchstart' : 'mouseenter';
        const leaveEvent: string = MultiDeviceHover.isTouch ? 'touchend' : 'mouseleave';
        Array.prototype.slice.call(elements).forEach(element => {
            element.removeEventListener(enterEvent, MultiDeviceHover.enterLisner, false);
            element.removeEventListener(leaveEvent, MultiDeviceHover.leaveLisner, false);
        });
    }
    /**
     * on mouse enter
     * @param event
     */
    static enterLisner(event: HTMLElementEvent<HTMLInputElement>): void {
        const element: Element = event.target;
        element.classList.add(MultiDeviceHover.options.hoverClass);
        MultiDeviceHover.options.onEnter(element, event);
    }
    /**
     * on mouse leave
     * @param event
     */
    static leaveLisner(event: HTMLElementEvent<HTMLInputElement>): void {
        const element: Element = event.target;
        element.classList.remove(MultiDeviceHover.options.hoverClass);
        MultiDeviceHover.options.onLeave(element, event);
    }
}
