import IGeometry, { IEntity, IPoint } from "./geomtry";
import { DxfBaseReader, IGroup } from "../DxfBaseReader";
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
