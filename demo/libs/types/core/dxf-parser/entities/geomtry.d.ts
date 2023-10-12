import { DxfBaseReader, IGroup } from "../DxfBaseReader";
/**
 * @internal
 */
export interface IPoint {
    x: number;
    y: number;
    z?: number;
    bulge?: number;
}
export interface IEntity {
    lineType: string;
    layer: string;
    lineTypeScale: number;
    visible: boolean;
    colorIndex: number;
    color: number;
    isTrueColor: boolean;
    inPaperSpace: boolean;
    layoutName: string;
    ownerHandle: string;
    materialObjectHandle: number;
    lineweight: 0 | 5 | 9 | 13 | 15 | 18 | 20 | 25 | 30 | 35 | 40 | 50 | 53 | 60 | 70 | 80 | 90 | 100 | 106 | 120 | 140 | 158 | 200 | 211 | -3 | -2 | -1;
    extendedData?: {
        customStrings?: string[];
        applicationName?: string;
        originalHandle?: string;
        originalType?: string;
        outlines?: number[][][];
    };
    type: string;
    handle: string;
    blockPosition?: IPoint;
    attributesFollow?: boolean;
}
export declare type EntityName = "POINT" | "3DFACE" | "ARC" | "ATTDEF" | "ATTRIB" | "CIRCLE" | "DIMENSION" | "MULTILEADER" | "ELLIPSE" | "HATCH" | "IMAGE" | "INSERT" | "LEADER" | "LINE" | "LWPOLYLINE" | "MTEXT" | "OLE2FRAME" | "POLYLINE" | "REGION" | "RAY" | "SEQEND" | "SOLID" | "SPLINE" | "ACAD_TABLE" | "TEXT" | "VERTEX" | "VIEWPORT" | "XLINE";
export default interface IGeometry {
    ForEntityName: EntityName;
    parseEntity(scanner: DxfBaseReader, curr: IGroup): IEntity;
}
