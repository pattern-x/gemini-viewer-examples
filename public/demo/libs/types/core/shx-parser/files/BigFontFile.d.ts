import { BinaryReader } from "../../helpers/BinaryReader";
import { FontFile, ShxFontType } from "./FontFile";
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
