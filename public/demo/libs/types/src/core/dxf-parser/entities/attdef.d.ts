import IGeometry, { IEntity, IPoint } from "./geomtry";
import { DxfBaseReader, IGroup } from "../DxfBaseReader";
export interface IAttdefEntity extends IEntity {
    xScale: number;
    textStyle: "STANDARD" | string;
    text: string;
    tag: string;
    prompt: string;
    startPoint: IPoint;
    endPoint: IPoint;
    thickness: number;
    textHeight: number;
    rotation: number;
    obliqueAngle: number;
    invisible: boolean;
    constant: boolean;
    verificationRequired: boolean;
    preset: boolean;
    backwards: boolean;
    mirrored: boolean;
    horizontalJustification: number;
    fieldLength: number;
    verticalJustification: number;
    extrusionDirectionX: number;
    extrusionDirectionY: number;
    extrusionDirectionZ: number;
}
export default class Attdef implements IGeometry {
    ForEntityName: "ATTDEF";
    parseEntity(scanner: DxfBaseReader, curr: IGroup): IAttdefEntity;
}
