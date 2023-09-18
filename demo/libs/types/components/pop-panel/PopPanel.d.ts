export declare class PopPanel {
    private readonly container;
    private element;
    header: HTMLElement;
    body: HTMLElement;
    private isFollowing;
    private diffX;
    private diffY;
    constructor(id: string, content: string | HTMLElement, container?: HTMLElement);
    start: (event: MouseEvent) => void;
    stop: () => void;
    follow: (event: MouseEvent) => void;
    destroy(): void;
}
