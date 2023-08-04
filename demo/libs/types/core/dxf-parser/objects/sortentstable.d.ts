import { DxfBaseReader, IGroup } from "../DxfBaseReader";
import { IObject, IObjectParser } from "./common";
export interface ISortEntsObject extends IObject {
    entityHandles: string[][];
}
export interface ISortEntsTableObject extends IObject {
    sortEntsObject: ISortEntsObject;
}
export declare class SortEntsTable implements IObjectParser {
    ForObjectName: "SORTENTSTABLE";
    parseObject(scanner: DxfBaseReader, curr: IGroup): ISortEntsTableObject;
}
