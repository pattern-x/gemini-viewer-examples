import { DxfBaseReader, IGroup } from "../DxfBaseReader";
import IGeometry, { IEntity, IPoint } from './geomtry';
export interface IRayEntity extends IEntity {
    vertices: IPoint[];
    directionVector: IPoint;
}
export default class Ray implements IGeometry {
    ForEntityName: "RAY";
    parseEntity(scanner: DxfBaseReader, curr: IGroup): IRayEntity;
}
