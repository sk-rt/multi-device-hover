/**
 * MultiDeviceHover
 * https://github.com/sk-rt/multi-device-hover
 *
 * Copyright (c) 2018  Ryuta Sakai
 * Licensed under the MIT license.
 */
interface OptionEntity {
    hoverClass?: string | string[];
    onEnter?(element: HoverElement, event: Event): void;
    onLeave?(element: HoverElement, event: Event): void;
    onDestroy?(element: HoverElement): void;
}
interface HoverElement extends Element {
    _mdhOptions?: OptionEntity;
}
export default class MultiDeviceHover {
    private static isTouch;
    /**
     * @param elements
     * @param options
     */
    static init(elements: NodeListOf<HoverElement>, options?: OptionEntity): void;
    /**
     * Remove event & property form Elements
     * @param elements
     */
    static destroy(elements: NodeListOf<HoverElement>): void;
}
export {};
