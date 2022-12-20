import { DxfBaseReader, IGroup } from "../DxfBaseReader";
import IGeometry, { IEntity, IPoint } from "./geomtry";
export interface IAttribEntity extends IEntity {
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
export default class Attrib implements IGeometry {
    ForEntityName: "ATTRIB";
    parseEntity(scanner: DxfBaseReader, curr: IGroup): IAttribEntity;
}
