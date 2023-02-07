import { DxfBaseReader, IGroup } from "../DxfBaseReader";
export interface IObject {
    type: string;
    handle: string;
    ownerHandle: string;
    extendedData?: {
        customStrings?: string[];
        applicationName?: string;
    };
}
export type ObjectName = "ACAD_PROXY_OBJECT" | "ACDBDICTIONARYWDFLT" | "ACDBPLACEHOLDER" | "DATATABLE" | "DICTIONARY" | "DICTIONARYVAR" | "DIMASSOC" | "FIELD" | "GEODATA" | "IDBUFFER" | "IMAGEDEF" | "IMAGEDEF_REACTOR" | "LAYER_INDEX" | "LAYER_FILTER" | "LAYOUT" | "LIGHTLIST" | "MATERIAL" | "MLINESTYLE" | "OBJECT_PTR" | "PLOTSETTINGS" | "RASTERVARIABLES" | "RENDER" | "SECTION" | "SPATIAL_INDEX" | "SPATIAL_FILTER" | "SORTENTSTABLE" | "TABLESTYLE" | "UNDERLAYDEFINITION" | "VISUALSTYLE" | "VBA_PROJECT" | "WIPEOUTVARIABLES" | "XRECORD";
export interface IObjectParser {
    ForObjectName: ObjectName;
    parseObject(scanner: DxfBaseReader, curr: IGroup): IObject;
}
