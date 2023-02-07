import IGeometry, { IEntity } from "./geomtry";
import { DxfBaseReader, IGroup } from "../DxfBaseReader";
export interface IOleEntity extends IEntity {
    documentType: string;
    version: number;
    leftUpX: number;
    leftUpY: number;
    leftUpZ: number;
    rightDownX: number;
    rightDownY: number;
    rightDownZ: number;
    type: string;
    tileModeDescriptor: number;
    binaryData: string;
    lengthOfBinaryData: number;
}
export default class Ole implements IGeometry {
    readonly ForEntityName = "OLE2FRAME";
    parseEntity(scanner: DxfBaseReader, curr: IGroup): IOleEntity;
}
