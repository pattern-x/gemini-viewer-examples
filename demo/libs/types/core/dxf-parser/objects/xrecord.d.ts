import { DxfBaseReader, IGroup } from "../DxfBaseReader";
import { IObject, IObjectParser } from "./common";
import { DictionaryCloningFlags } from "./dictionary";
export interface IXRecord extends IObject {
    binaryData: string | undefined;
    cloningFlag: DictionaryCloningFlags;
}
export declare class XRecord implements IObjectParser {
    ForObjectName: "XRECORD";
    parseObject(scanner: DxfBaseReader, curr: IGroup): IXRecord;
}
