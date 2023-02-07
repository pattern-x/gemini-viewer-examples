import { IObject, IObjectParser } from "./common";
import { DxfBaseReader, IGroup } from "../DxfBaseReader";
import { IPoint } from "../entities/geomtry";
export interface ISpatialFilterObject extends IObject {
    origin: IPoint;
    numberOfPointsOnClipBoundary: number;
    vertices: IPoint[];
    extrusionDirectionX: number;
    extrusionDirectionY: number;
    extrusionDirectionZ: number;
    clipBoundaryVisible: boolean;
    frontClippingPlaneFlag: boolean;
    frontClippingPlaneDistance: number;
    backClippingPlaneFlag: boolean;
    backClippingPlaneDistance: number;
    matrix: number[];
    invertBlockMatrix: number[];
}
export declare class SpatialFilter implements IObjectParser {
    ForObjectName: "SPATIAL_FILTER";
    parseObject(scanner: DxfBaseReader, curr: IGroup): ISpatialFilterObject;
}
