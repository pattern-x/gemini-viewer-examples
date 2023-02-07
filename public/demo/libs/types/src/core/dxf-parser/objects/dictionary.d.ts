import { IObject, IObjectParser } from "./common";
import { DxfBaseReader, IGroup } from "../DxfBaseReader";
export declare enum DictionaryCloningFlags {
    NotApplicable = 0,
    KeepExisting = 1,
    UseClone = 2,
    XrefName = 3,
    Name = 4,
    UnmangleName = 5
}
export interface IDictionaryObject extends IObject {
    entries: Record<string, string>;
    isHardOwner: boolean;
    cloningFlag: DictionaryCloningFlags;
}
export declare class Dictionary implements IObjectParser {
    ForObjectName: "DICTIONARY";
    parseObject(scanner: DxfBaseReader, curr: IGroup): IDictionaryObject;
}
