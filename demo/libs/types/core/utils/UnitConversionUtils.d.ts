/**
 * @internal
 */
export declare const unitConversionByMeter: {
    [key: string]: number;
};
/**
 * @internal
 */
export declare const unitLabel: {
    [key: string]: string;
};
/**
 * @internal
 */
export declare const getUnitStr: (unit: string, power?: number) => string;
/**
 * Gets unit
 * value
 * sourceUnit
 * targetUnit
 * @internal
 */
export interface valueWithUnit {
    value: number;
    unit: string;
}
/**
 * @internal
 */
export declare const getLengthValueByUnit: (value: number, sourceUnit: string, targetUnit: string, power?: number) => valueWithUnit;
