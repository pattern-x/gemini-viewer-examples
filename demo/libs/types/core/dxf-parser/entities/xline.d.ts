import { DxfBaseReader, IGroup } from "../DxfBaseReader";
import IGeometry, { IEntity, IPoint } from './geomtry';
export interface IXLineEntity extends IEntity {
    vertices: IPoint[];
    directionVector: IPoint;
}
export default class XLine implements IGeometry {
    ForEntityName: "XLINE";
    parseEntity(scanner: DxfBaseReader, curr: IGroup): IXLineEntity;
}
