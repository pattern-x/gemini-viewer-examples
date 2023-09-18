import { DxfBaseReader, IGroup } from "../DxfBaseReader";
import IGeometry, { IEntity, IPoint } from "./geomtry";
export declare enum ImageFlags {
    ShowImage = 1,
    ShowImageWhenNotAlignedWithScreen = 2,
    UseClippingBoundary = 4,
    TransparencyIsOn = 8
}
export declare enum ImageClippingBoundaryType {
    Rectangular = 1,
    Polygonal = 2
}
export declare enum ImageClipMode {
    Outside = 0,
    Inside = 1
}
export interface IImageEntity extends IEntity {
    position: IPoint;
    uPixel: IPoint;
    vPixel: IPoint;
    imageSize: IPoint;
    imageDefHandle: string;
    flags: ImageFlags;
    clipping: number;
    brightness: number;
    contrast: number;
    fade: number;
    imageDefReactorHandle: string;
    clippingBoundaryType: ImageClippingBoundaryType;
    countBoundaryPoints: number;
    clippingBoundaryPath: IPoint[];
    clipMode: ImageClipMode;
}
export default class Image implements IGeometry {
    ForEntityName: "IMAGE";
    parseEntity(scanner: DxfBaseReader, curr: IGroup): IImageEntity;
}
