import IGeometry, { IEntity, IPoint } from "./geomtry";
import { DxfBaseReader, IGroup } from "../DxfBaseReader";
export interface I3DfaceEntity extends IEntity {
    shape: boolean;
    hasContinuousLinetypePattern: boolean;
    vertices: IPoint[];
}
export default class ThreeDface implements IGeometry {
    ForEntityName: "3DFACE";
    parseEntity(scanner: DxfBaseReader, curr: IGroup): I3DfaceEntity;
}
