import type { Container } from "./Container";
export interface ProgressItem {
    div: HTMLDivElement;
    onProgress?: (event: ProgressEvent) => void;
}
export declare class ProgressBar {
    private element;
    private progressItems;
    private replaceReg;
    constructor(container: Container);
    addProgressItem(id: string, message?: string, onProgress?: (event: ProgressEvent) => void): void;
    removeProgressItem(id: string): void;
    updateProgressBar(id: string, progress: number | ProgressEvent, min?: number, max?: number): void;
    setVisible(visible: boolean): void;
    /**
     * Removes a progress item after some time
     * @param progressItemId
     */
    delayRemoveProgressItem(progressItemId: string, delayInMs?: number): void;
    destroy(): void;
}
