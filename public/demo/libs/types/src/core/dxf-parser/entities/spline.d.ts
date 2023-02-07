import IGeometry, { IEntity, IPoint } from "./geomtry";
import { DxfBaseReader, IGroup } from "../DxfBaseReader";
export interface ISplineEntity extends IEntity {
    controlPoints?: IPoint[];
    fitPoints?: IPoint[];
    startTangent: IPoint;
    endTangent: IPoint;
    knotValues: number[];
    closed: boolean;
    periodic: boolean;
    rational: boolean;
    planar: boolean;
    linear: boolean;
    degreeOfSplineCurve: number;
    numberOfKnots: number;
    numberOfControlPoints: number;
    numberOfFitPoints: number;
    normalVector: IPoint;
}
export default class Spline implements IGeometry {
    ForEntityName: "SPLINE";
    parseEntity(scanner: DxfBaseReader, curr: IGroup): ISplineEntity;
}
