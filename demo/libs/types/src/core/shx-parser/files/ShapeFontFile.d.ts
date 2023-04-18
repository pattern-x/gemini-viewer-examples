import { BinaryReader } from "../../helpers/BinaryReader";
import { ShxFontType } from "../Shx.constants";
import { FontFile } from "./FontFile";
export declare class ShapeFontFile extends FontFile {
    type: ShxFontType;
    constructor(url: string);
    init(reader: BinaryReader): void;
}
export declare class ShapeIndexItem {
    code: number;
    length: number;
}
