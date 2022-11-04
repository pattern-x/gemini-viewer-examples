import { DxfBaseReader, IGroup } from "../DxfBaseReader";
import IGeometry, { IEntity, IPoint } from "./geomtry";
export interface ITextEntity extends IEntity {
    startPoint: IPoint;
    endPoint: IPoint;
    textHeight: number;
    xScale: number;
    rotation: number;
    text: string;
    textStyle: string;
    mirrored: number;
    halign: number;
    valign: number;
}
export default class Text implements IGeometry {
    ForEntityName: "TEXT";
    parseEntity(scanner: DxfBaseReader, curr: IGroup): ITextEntity;
}
