import { IObject, IObjectParser } from "./common";
import { DictionaryCloningFlags } from "./dictionary";
import { DxfBaseReader, IGroup } from "../DxfBaseReader";
export interface IXRecord extends IObject {
    binaryData: string | undefined;
    cloningFlag: DictionaryCloningFlags;
}
export declare class XRecord implements IObjectParser {
    ForObjectName: "XRECORD";
    parseObject(scanner: DxfBaseReader, curr: IGroup): IXRecord;
}
