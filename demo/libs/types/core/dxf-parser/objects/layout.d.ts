import { IObject, IObjectParser } from './common';
import { DxfBaseReader, IGroup } from '../DxfBaseReader';
import { IPoint } from '../entities/geomtry';
/**
 * @internal
 */
export interface ILayoutObject extends IObject {
    plotSettings?: object;
    layoutName: string;
    flag: number;
    tabOrder: number;
    minLimit: IPoint;
    maxLimit: IPoint;
    basePoint: IPoint;
    minExtent: IPoint;
    maxExtent: IPoint;
    elevation: number;
    origin: IPoint;
    XAxis: IPoint;
    YAxis: IPoint;
    orthographicType: number;
    blockTableHandle: string;
    viewportHandle: string;
    associatedBlockName: string;
}
export declare class Layout implements IObjectParser {
    ForObjectName: "LAYOUT";
    parseObject(scanner: DxfBaseReader, curr: IGroup): ILayoutObject;
}
