/**
 * @internal
 */
export declare class Event {
    private eventList;
    /**
     * @internal
     */
    addEventListener(type: string | symbol, handler: (event?: unknown) => void): void;
    /**
     * @internal
     */
    dispatchEvent(type: string | symbol, event?: unknown): void;
}
