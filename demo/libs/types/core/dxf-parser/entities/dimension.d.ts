import { DxfBaseReader, IGroup } from "../DxfBaseReader";
import IGeometry, { IEntity, IPoint } from "./geomtry";
export interface IDimensionEntity extends IEntity {
    block: string;
    dimStyleName: string;
    anchorPoint: IPoint;
    middleOfText: IPoint;
    insertionPoint: IPoint;
    linearOrAngularPoint1: IPoint;
    linearOrAngularPoint2: IPoint;
    diameterOrRadiusPoint: IPoint;
    arcPoint: IPoint;
    dimensionType: number;
    attachmentPoint: number;
    actualMeasurement: number;
    text: string;
    angle: number;
}
export default class Dimension implements IGeometry {
    ForEntityName: "DIMENSION";
    parseEntity(scanner: DxfBaseReader, curr: IGroup): IDimensionEntity;
}
