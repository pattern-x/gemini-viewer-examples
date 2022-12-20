/**
 * This class implemented setTimeout and setInterval using RequestAnimationFrame
 * This code references to
 * https://github.com/aisriver/myHome3D/blob/master/src/utils/RAF.ts
 * @internal
 */
export declare class RafHelper {
    readonly TIMEOUT = "timeout";
    readonly INTERVAL = "interval";
    private timeoutMap;
    private intervalMap;
    private run;
    private setIdMap;
    setTimeout(cb: () => void, interval: number): symbol;
    clearTimeout(timer: symbol): void;
    setInterval(cb: () => void, interval: number): symbol;
    clearInterval(timer: symbol): void;
}
