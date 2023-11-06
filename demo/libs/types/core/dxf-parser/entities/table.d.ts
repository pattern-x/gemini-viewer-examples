import { DxfBaseReader, IGroup } from "../DxfBaseReader";
import IGeometry, { IEntity, IPoint } from "./geomtry";
import { IMtextEntity } from "./mtext";
export interface ITableEntity extends IEntity {
    version: number;
    startPoint: IPoint;
    directionVector: IPoint;
    tableValue: number;
    rowCount: number;
    columnCount: number;
    overrideFlag?: number;
    borderColorOverrideFlag?: number;
    borderLineWeightOverrideFlag?: number;
    borderVisibilityOverrideFlag?: number;
    rowHeightArr: number[];
    columnWidthArr: number[];
    tableStyleId?: string;
    blockRecordHandle?: string;
    cells: TableCell[];
}
export interface TableCell extends IMtextEntity {
    cellType: number;
    flagValue?: number;
    mergedValue?: number;
    autoFit?: number;
    borderWidth?: number;
    borderHeight?: number;
    overrideFlag?: number;
    virtualEdgeFlag?: number;
    fieldObjetId?: string;
    blockTableRecordId?: string;
    blockScale?: number;
    blockAttrNum?: number;
    attrDefineId?: string[];
    attrText?: string;
    textHeight: number;
    extendedCellFlags?: number;
}
export default class Table implements IGeometry {
    ForEntityName: "ACAD_TABLE";
    parseEntity(scanner: DxfBaseReader, curr: IGroup): ITableEntity;
}
