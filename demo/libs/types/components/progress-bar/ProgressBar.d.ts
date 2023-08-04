export interface ProgressItem {
    id: string;
    div: HTMLDivElement;
}
export declare class ProgressBar {
    private element;
    private progresseItems;
    constructor(parentElement: HTMLElement);
    setVisibility(visible: boolean): void;
    /**
     * Adds a progress item
     * @param progressItemId
     * @param message Initial message
     * @param progress number between 0-100
     */
    addProgressItem(progressItemId: string, message?: string): void;
    /**
     * Updates a progress item
     * @param progressItemId
     * @param message
     * @param progress number between 0-100
     */
    updateProgress(progressItemId: string, message?: string, progress?: number): void;
    /**
     * Removes a progress item
     * @param progressItemId
     */
    removeProgressItem(progressItemId: string): void;
    /**
     * Removes a progress item after some time
     * @param progressItemId
     */
    delayRemoveProgressItem(progressItemId: string, delayInMs?: number): void;
}
