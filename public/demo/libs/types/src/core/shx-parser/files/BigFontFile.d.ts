import { FontFile, ShxFontType } from "./FontFile";
import { BinaryReader } from "../../helpers/BinaryReader";
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
