import { DxfBaseReader, IGroup } from "../DxfBaseReader";
import IGeometry, { IEntity, IPoint } from "./geomtry";
export interface ISolidEntity extends IEntity {
    points: IPoint[];
    extrusionDirection: IPoint;
}
export default class Solid implements IGeometry {
    ForEntityName: "SOLID";
    parseEntity(scanner: DxfBaseReader, curr: IGroup): ISolidEntity;
}
