export declare class ImageManager {
    private loader;
    enableCache: boolean;
    constructor();
    private setImageToInedxdb;
    private getImageFromIndexdb;
    private removeImageFromIndexdb;
    private clearImageFromIndexdb;
    private saveImageData;
    get(url: string): Promise<HTMLImageElement>;
    remove(url: string): Promise<void>;
    clear(): Promise<void>;
    static getFileName(url: string): string;
    destroy(): void;
}
