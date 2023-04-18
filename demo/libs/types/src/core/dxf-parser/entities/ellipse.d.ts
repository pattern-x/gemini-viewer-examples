import { DxfBaseReader, IGroup } from "../DxfBaseReader";
import IGeometry, { IEntity, IPoint } from "./geomtry";
export interface IEllipseEntity extends IEntity {
    center: IPoint;
    majorAxisEndPoint: IPoint;
    axisRatio: number;
    startAngle: number;
    endAngle: number;
    name: string;
    extrusionDirection: IPoint;
}
export default class Ellipse implements IGeometry {
    ForEntityName: "ELLIPSE";
    parseEntity(scanner: DxfBaseReader, curr: IGroup): IEllipseEntity;
}
