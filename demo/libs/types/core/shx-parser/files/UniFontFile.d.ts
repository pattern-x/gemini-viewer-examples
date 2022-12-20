import { FontFile, ShxFontType } from "./FontFile";
import { BinaryReader } from "../../helpers/BinaryReader";
export declare class UniFontFile extends FontFile {
    type: ShxFontType;
    isUniCode: boolean;
    isEmbedded: boolean;
    constructor(url: string);
    init(reader: BinaryReader): void;
}
export declare class UniFontIndexItem {
    code: number;
    length: number;
}
