export declare type Handler<T = any> = (val: T) => void;
/**
 * @internal
 */
export declare class Event<Events extends Record<string, any> = {}> {
    private map;
    /**
     * @internal
     */
    addEventListener<EventName extends keyof Events>(name: EventName, handler: Handler<Events[EventName]>): void;
    /**
     * @internal
     */
    dispatchEvent<EventName extends keyof Events>(name: EventName, value?: Events[EventName]): void;
    /**
     * Checks if there is a listener
     * @internal
     */
    hasEventListener<EventName extends keyof Events>(name: EventName): boolean;
    /**
     * Removes all event listeners
     * @internal
     */
    removeEventListener(): void;
    /**
     * @internal
     */
    removeEventListener<EventName extends keyof Events>(name: EventName): void;
    /**
     * @internal
     */
    removeEventListener<EventName extends keyof Events>(name: EventName, handler: Handler<Events[EventName]>): void;
}
