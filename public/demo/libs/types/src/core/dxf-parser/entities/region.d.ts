import IGeometry, { IEntity } from "./geomtry";
import { DxfBaseReader, IGroup } from "../DxfBaseReader";
export interface IRegionEntity extends IEntity {
    modelerVersion?: number;
    proprietaryData?: string;
}
export default class Region implements IGeometry {
    ForEntityName: "REGION";
    parseEntity(scanner: DxfBaseReader, curr: IGroup): IRegionEntity;
}
