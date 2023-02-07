/**
 * Units are defined the same order as to Dxf format
 */
export declare enum Units {
    Unitless = "Unitless",
    Inches = "Inches",
    Feet = "Feet",
    Millimeters = "Millimeters",
    Centimeters = "Centimeters",
    Meters = "Meters"
}
/**
 * Gets the unit scale when converting to meter
 */
export declare const unitScaleToMeter: (srcUnit: Units) => number;
export declare const unitScaleConversion: (srcUnit: Units, destUnit: Units) => number;
