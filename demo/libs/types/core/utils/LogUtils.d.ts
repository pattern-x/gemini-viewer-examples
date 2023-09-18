import * as loglevel from "loglevel";
export declare const log: loglevel.RootLogger;
/**
 * Sets log level.
 * Note that, we limit user to set only some of the levels.
 */
export declare const setLogLevel: (level: string) => void;
