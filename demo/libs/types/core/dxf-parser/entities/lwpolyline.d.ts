import { DxfBaseReader, IGroup } from "../DxfBaseReader";
import IGeometry, { IEntity, IPoint } from "./geomtry";
export interface IVertex extends IPoint {
    startWidth?: number;
    endWidth?: number;
}
export interface ILwpolylineEntity extends IEntity {
    vertices: IVertex[];
    elevation?: number;
    thickness?: number;
    shape: boolean;
    hasContinuousLinetypePattern: boolean;
    constantWidth?: number;
    extrusionDirectionX?: number;
    extrusionDirectionY?: number;
    extrusionDirectionZ?: number;
}
export default class Lwpolyline implements IGeometry {
    ForEntityName: "LWPOLYLINE";
    parseEntity(scanner: DxfBaseReader, curr: IGroup): ILwpolylineEntity;
}
