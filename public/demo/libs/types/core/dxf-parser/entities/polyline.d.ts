import { IVertexEntity } from "./vertex";
import IGeometry, { IEntity, IPoint } from "./geomtry";
import { DxfBaseReader, IGroup } from "../DxfBaseReader";
export interface IPolylineEntity extends IEntity {
    vertices: IVertexEntity[];
    thickness: number;
    shape: boolean;
    includesCurveFitVertices: boolean;
    includesSplineFitVertices: boolean;
    is3dPolyline: boolean;
    is3dPolygonMesh: boolean;
    is3dPolygonMeshClosed: boolean;
    isPolyfaceMesh: boolean;
    hasContinuousLinetypePattern: boolean;
    extrusionDirection: IPoint;
}
export default class Polyline implements IGeometry {
    ForEntityName: "POLYLINE";
    parseEntity(scanner: DxfBaseReader, curr: IGroup): IPolylineEntity;
}
