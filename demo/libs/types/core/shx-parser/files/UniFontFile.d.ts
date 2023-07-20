import { BinaryReader } from "../../helpers/BinaryReader";
import { ShxFontType } from "../Shx.constants";
import { BaseFontFile } from "./BaseFontFile";
export declare class UniFontFile extends BaseFontFile {
    type: ShxFontType;
    isUniCode: boolean;
    isEmbedded: boolean;
    constructor(url: string);
    init(reader: BinaryReader): void;
}
