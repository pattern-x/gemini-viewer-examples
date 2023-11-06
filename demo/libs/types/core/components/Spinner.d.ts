import type { Container } from "./Container";
export declare class Spinner {
    private element;
    jobCount: number;
    constructor(container: Container);
    /**
     * Sets spinner visibility
     */
    private setSpinnerVisibility;
    increaseJobCount(): void;
    decreaseJobCount(): void;
    destroy(): void;
}
