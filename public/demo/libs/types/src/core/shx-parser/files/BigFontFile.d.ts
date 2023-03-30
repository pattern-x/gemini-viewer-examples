import { BinaryReader } from "../../helpers/BinaryReader";
import { ShxFontType } from "../Shx.constants";
import { FontFile } from "./FontFile";
export declare class BigFontFile extends FontFile {
    isExtend: boolean;
    type: ShxFontType;
    constructor(url: string);
    init(reader: BinaryReader): void;
}
export declare class BigFontIndexItem {
    code: number;
    length: number;
    offset: number;
}
