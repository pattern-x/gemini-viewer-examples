import { DxfBaseReader, IGroup } from "../DxfBaseReader";
import { IPoint } from "../entities/geomtry";
import { IObject, IObjectParser } from "./common";
export declare enum ImgaeDefLoaded {
    Unloaded = 0,
    Loaded = 1
}
export declare enum ImageDefResolutionUnits {
    NoUnits = 0,
    Centimeters = 2,
    Inches = 5
}
export interface IImageDefObject extends IObject {
    classVersion: number;
    filename: string;
    imageSize: IPoint;
    pixelSize: IPoint;
    loaded: ImgaeDefLoaded;
    resolutionUnits: ImageDefResolutionUnits;
}
export declare class ImageDef implements IObjectParser {
    ForObjectName: "IMAGEDEF";
    parseObject(scanner: DxfBaseReader, curr: IGroup): IImageDefObject;
}
