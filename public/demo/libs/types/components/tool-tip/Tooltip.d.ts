interface TooltipConfig {
    showOnCreate?: boolean;
    followPointer?: boolean;
    parentNode?: HTMLElement;
    target?: HTMLElement;
}
export declare class Tooltip {
    private node;
    private parentNode;
    private target;
    private childNode;
    constructor(id: string, content?: string | HTMLElement | null, cfg?: TooltipConfig);
    setContent(content: string | HTMLElement): void;
    updateChildContent(content: string | HTMLElement): void;
    follow: (event: MouseEvent) => void;
    show: () => false | void;
    hide: () => false | void;
    destroy: () => void;
}
export {};
