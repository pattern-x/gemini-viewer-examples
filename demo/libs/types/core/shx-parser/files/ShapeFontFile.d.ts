import { FontFile, ShxFontType } from "./FontFile";
import { BinaryReader } from "../../helpers/BinaryReader";
export declare class ShapeFontFile extends FontFile {
    type: ShxFontType;
    constructor(url: string);
    init(reader: BinaryReader): void;
}
export declare class ShapeIndexItem {
    code: number;
    length: number;
}
