/**
 * @internal
 */
export declare class FpsUtils {
    private prevTime;
    private beginTime;
    private frames;
    fps: number;
    constructor();
    begin(): void;
    end(): number;
    update(): void;
}
