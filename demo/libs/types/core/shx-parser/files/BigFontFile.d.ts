import { BinaryReader } from "../../helpers/BinaryReader";
import { ShxFontType } from "../Shx.constants";
import { BaseFontFile } from "./BaseFontFile";
export declare class BigFontFile extends BaseFontFile {
    isExtend: boolean;
    type: ShxFontType;
    constructor(url: string);
    init(reader: BinaryReader): void;
}
