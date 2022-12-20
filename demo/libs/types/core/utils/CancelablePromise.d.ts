export declare class CancelablePromise {
    promise: Promise<unknown>;
    private isCanceled;
    private cancelReject?;
    constructor(promise: Promise<unknown>);
    cancel(): void;
}
