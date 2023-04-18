import { DxfBaseReader, IGroup } from "../DxfBaseReader";
import IGeometry, { IEntity, IPoint } from "./geomtry";
export interface ICircleEntity extends IEntity {
    center: IPoint;
    radius: number;
    startAngle: number;
    endAngle: number;
    angleLength: number;
}
export default class Circle implements IGeometry {
    ForEntityName: "CIRCLE";
    parseEntity(scanner: DxfBaseReader, curr: IGroup): ICircleEntity;
}
