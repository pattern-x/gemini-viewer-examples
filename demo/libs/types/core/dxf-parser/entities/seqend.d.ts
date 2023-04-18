import { DxfBaseReader, IGroup } from "../DxfBaseReader";
import IGeometry, { IEntity } from './geomtry';
export interface ISeqendEntity extends IEntity {
}
export default class Seqend implements IGeometry {
    ForEntityName: "SEQEND";
    parseEntity(scanner: DxfBaseReader, curr: IGroup): ISeqendEntity;
}
