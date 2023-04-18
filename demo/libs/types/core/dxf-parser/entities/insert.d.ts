import { DxfBaseReader, IGroup } from "../DxfBaseReader";
import IGeometry, { IEntity, IPoint } from "./geomtry";
export interface IInsertEntity extends IEntity {
    block: string;
    attributesFollow: boolean;
    xScale: number;
    yScale: number;
    zScale: number;
    position: IPoint;
    rotation: number;
    columnCount: number;
    rowCount: number;
    columnSpacing: number;
    rowSpacing: number;
    extrusionDirection: IPoint;
}
export default class Insert implements IGeometry {
    ForEntityName: "INSERT";
    parseEntity(scanner: DxfBaseReader, curr: IGroup): IInsertEntity;
}
