import { DxfBaseReader, IGroup } from "../DxfBaseReader";
import IGeometry, { IEntity, IPoint } from "./geomtry";
export interface IViewportEntity extends IEntity {
    centerPoint: IPoint;
    width_paperSpace: number;
    height_paperSpace: number;
    viewportStatus: number;
    viewportId: string;
    centerPoint_dcs: IPoint;
    snapBasePoint_dcs: IPoint;
    snapSpacing_dcs: IPoint;
    gridSpacing_dcs: IPoint;
    viewDirection: IPoint;
    viewTarget: IPoint;
    perspectiveLens: number;
    frontClippingPlaneZ: number;
    backClippingPlaneZ: number;
    viewHeight: number;
    snapAngle: number;
    viewTwistAngle: number;
    circleZoomPercent: number;
    frozenLayerHandles: string[];
    viewportStatusFlags: number;
    viewportClippingBoundaryhandleId: string;
    plotStyleSheetName: string;
    renderMode: number;
    viewportFlag_ucs: number;
    ucsIcon: string;
    ucsOrigin: IPoint;
    ucsXAxis: IPoint;
    ucsYAxis: IPoint;
    ucsTableRecordHandle: string;
    baseUcsTableRecordHandle: string;
    orthographicType: number;
    elevation: number;
    shadePlotMode: number;
    frequency: number;
    lightingFlag: number;
    lightingType: number;
    viewBrightness: number;
    viewContrast: number;
}
export default class Viewport implements IGeometry {
    ForEntityName: "VIEWPORT";
    parseEntity(scanner: DxfBaseReader, curr: IGroup): IViewportEntity;
}
