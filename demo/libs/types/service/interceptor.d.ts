import { AxiosRequestConfig, Canceler } from "axios";
export interface PendingRequest {
    id: string;
    cancel: Canceler;
}
/**
 * Prompts error message
 * @param {string} message error message
 * @param {number} status error code
 */
export declare const pushErrorMessage: (message: string, status?: string | undefined) => void;
/**
 * General error handler
 * @param {Object} error error object
 */
export declare const errorHandler: (error: any) => void;
/**
 * General response handler
 */
export declare function responseHandler(response: any): any;
export declare function genRequestId(url: string, method: AxiosRequestConfig["method"], data: any): string;
export declare function cancelPending(requestId: string): void;
declare const instance: import("axios").AxiosInstance;
export default instance;
