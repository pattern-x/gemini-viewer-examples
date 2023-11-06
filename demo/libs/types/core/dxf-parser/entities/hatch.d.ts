import { DxfBaseReader, IGroup } from "../DxfBaseReader";
import IGeometry, { IEntity, IPoint } from "./geomtry";
export declare enum HatchBoundaryPathTypeFlag {
    Default = 0,
    External = 1,
    Polyline = 2,
    Derived = 4,
    Textbox = 8,
    Outermost = 16,
    MaxFlags = 31
}
export declare enum HatchEdgeType {
    Polyline = 0,
    Line = 1,
    Arc = 2,
    Ellipse = 3,
    Spline = 4
}
export declare abstract class HatchEdge {
    readonly type: HatchEdgeType;
    startPoint: IPoint;
    endPoint: IPoint;
    constructor(type: HatchEdgeType);
}
export declare class HatchPolyline extends HatchEdge {
    points: IPoint[];
    isClosed: boolean;
    constructor();
}
export declare class HatchLine extends HatchEdge {
    constructor();
}
export declare class HatchArc extends HatchEdge {
    center: IPoint;
    radius: number;
    startAngle: number;
    endAngle: number;
    bCounterclockwise: boolean;
    constructor();
}
export declare class HatchEllipse extends HatchEdge {
    center: IPoint;
    majorAxisEndPoint: IPoint;
    minorRatio: number;
    startAngle: number;
    endAngle: number;
    bCounterclockwise: boolean;
    constructor();
}
export declare class HatchSpline extends HatchEdge {
    controlPoints: IPoint[];
    numControlPoints: number;
    knotValues: number[];
    numKnots: number;
    bPeriodic: boolean;
    bRational: boolean;
    degreeOfSplineCurve: number;
    constructor();
}
export interface IHatchBoundaryPath {
    edges: HatchEdge[];
    pathTypeFlag: HatchBoundaryPathTypeFlag;
}
export declare enum HatchStyle {
    Normal = 0,
    Outer = 1,
    Ignore = 2
}
export declare enum HatchType {
    UserDefined = 0,
    Predefined = 1,
    Custom = 2
}
export interface IHatchPatternLine {
    angle: number;
    origin: IPoint;
    delta: IPoint;
    dashPattern: number[];
}
export interface IHatchEntity extends IEntity {
    elevationX: number;
    elevationY: number;
    elevationZ: number;
    pixelSize: number;
    associativity: boolean;
    annotatedBoundary: boolean;
    boundaryPathsCount: number;
    boundaryPaths: IHatchBoundaryPath[];
    seedPointsCount: number;
    extrusionDirectionX: number;
    extrusionDirectionY: number;
    extrusionDirectionZ: number;
    patternName: string;
    solidFill: boolean;
    patternFillColor: number;
    style: HatchStyle;
    patternType: HatchType;
    patternAngle: number;
    patternScale: number;
    patternLines?: IHatchPatternLine[];
    isGradientColor?: boolean;
    gradientColorCount?: number;
    gradientColors?: number[];
}
export default class Hatch implements IGeometry {
    readonly ForEntityName = "HATCH";
    parseEntity(scanner: DxfBaseReader, curr: IGroup): IHatchEntity;
}
