import { BinaryReader } from "../../helpers/BinaryReader";
import { ShxFontType } from "../Shx.constants";
import { FontFile } from "./FontFile";
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
