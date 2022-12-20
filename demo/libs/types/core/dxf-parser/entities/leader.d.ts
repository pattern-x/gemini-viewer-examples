import { DxfBaseReader, IGroup } from "../DxfBaseReader";
import IGeometry, { IEntity, IPoint } from "./geomtry";
export interface ILeaderEntity extends IEntity {
    dimensionStyle: string;
    position: IPoint;
    textHeight: number;
    textWidth: number;
    rotation: number;
    arrowFlag: number;
    pathType: number;
    arrowHeight: number;
    arrowHeadScale: number;
    creationFlag: number;
    direction: number;
    hasHookline: boolean;
    block: string;
    arrowHeadBlockHandle: string;
    vertices: IPoint[];
}
export default class Leader implements IGeometry {
    ForEntityName: "LEADER";
    parseEntity(scanner: DxfBaseReader, curr: IGroup): ILeaderEntity;
}
