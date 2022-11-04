import { DxfBaseReader, IGroup } from "./DxfBaseReader";
import { IEntity, IPoint } from "./entities/geomtry";
import { IObject } from "./objects/common";
/**
 * Returns the truecolor value of the given AutoCad color index value
 * @return {Number} truecolor value as a number
 */
export declare function getAcadColor(index: number): number;
/**
 * Parses the 2D or 3D coordinate, vector, or point. When complete,
 * the scanner remains on the last group of the coordinate.
 * @param {*} scanner
 */
export declare function parsePoint(scanner: DxfBaseReader): IPoint;
/**
 * Parses 16 numbers as an array. When complete,
 * the scanner remains on the last group of the value.
 * @param {*} scanner
 * @param {*} groupCode
 */
export declare function parseMatrix(scanner: DxfBaseReader, groupCode: number): number[];
/**
 * Attempts to parse codes common to all entities. Returns true if the group
 * was handled by this function.
 * @param {*} entity - the entity currently being parsed
 * @param {*} curr - the current group being parsed
 */
export declare function checkCommonEntityProperties(entity: IEntity, curr: IGroup): boolean;
/**
 * Attempts to parse codes common to all objects. Returns true if the group
 * was handled by this function.
 * @param {*} object - the object currently being parsed
 * @param {*} curr - the current group being parsed
 */
export declare function checkCommonObjectProperties(object: IObject, curr: IGroup): boolean;
