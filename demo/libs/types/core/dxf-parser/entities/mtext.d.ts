import { DxfBaseReader, IGroup } from "../DxfBaseReader";
import IGeometry, { IEntity, IPoint } from "./geomtry";
export interface IMtextEntity extends IEntity {
    text: string;
    position: IPoint;
    directionVector: IPoint;
    height: number;
    width: number;
    rotation: number;
    attachmentPoint: number;
    drawingDirection: number;
    textStyle?: string;
    lineSpaceFactor?: number;
}
export default class Mtext implements IGeometry {
    ForEntityName: "MTEXT";
    parseEntity(scanner: DxfBaseReader, curr: IGroup): IMtextEntity;
}
