import { DxfBaseReader, IGroup } from "../DxfBaseReader";
import IGeometry, { IEntity, IPoint } from "./geomtry";
export interface ILeaderEntity extends IEntity {
    leaderStyleId: number;
    leaderLineType: number;
    leaderLineColor: number;
    leaderLineTypeId: number;
    leaderLineWeight: number;
    enableLanding: boolean;
    enableDogLeg: boolean;
    doglegLength: number;
    arrowHeadId: number;
    arrowHeadSize: number;
    contentType: number;
    textStyleId: number;
    textLeftAttachmentType: number;
    textRightAttachmentType: number;
    textAngleType: number;
    textAlignmentType: number;
    textColor: number;
    enableFrameText: boolean;
    blockContentId: number;
    blockContentColor: number;
    blockContentScale: IPoint;
    blockContentRotation: number;
    blockContentConnectionType: number;
    enableAnotationScale: boolean;
    arrowHeadIndex: number;
    blockAttributeId: number;
    blockAttributeIndex: number;
    blockAttributeWidth: number;
    blockAttributeTextString: string;
    textDirectionNegative: boolean;
    textAlignInIPE: number;
    textAttachmentPoint: number;
    textAttachmentDirectionMText: number;
    textAttachmentDirectionBottom: number;
    textAttachmentDirectionTop: number;
    contextData: IMLeaderContextData;
}
export interface IMLeaderContextData {
    contentScale: number;
    contentBasePosition: IPoint;
    textHeight: number;
    arrowHeadSize: number;
    landingGap: number;
    hasMText: boolean;
    defaultTextContents: string;
    textNormalDirection: IPoint;
    textLocation: IPoint;
    textDirection: IPoint;
    textRotation: number;
    textWidth: number;
    textLineSpacingFactor: number;
    textLineSpacingStyle: number;
    textColor: number;
    textAttachment: number;
    textFlowDirection: number;
    textBackgroundColor: number;
    textBackgroundScaleFactor: number;
    textBackgroundTransparency: number;
    textBackgroundColorOn: boolean;
    textBackgroundFillOn: boolean;
    textColumnType: number;
    textUseAutoHeight: boolean;
    textColumnWidth: number;
    textColumnGutterWidth: number;
    textColumnFlowReversed: boolean;
    textColumnHeight: number;
    textUseWordBreak: boolean;
    hasBlock: boolean;
    blockContentId: number;
    blockContentNormalDirection: IPoint;
    blockContentPosition: IPoint;
    blockContentScale: number;
    blockContentRotation: number;
    blockContentColor: number;
    blockTransformationMatrix: number[];
    planeOriginPoint: IPoint;
    planeXAxisDirection: IPoint;
    planeYAxisDirection: IPoint;
    planeNormalReversed: boolean;
    leaders: IMLeaderLeader[];
}
export interface IMLeaderLeader {
    hasSetLastLeaderLinePoint: boolean;
    hasSetDoglegVector: boolean;
    lastLeaderLinePoint: IPoint;
    doglegVector: IPoint;
    leaderBranchIndex: number;
    doglegLength: number;
    leaderLines: IMLeaderLine[];
}
export interface IMLeaderLine {
    vertices: IPoint[][];
    leaderLineIndex: number;
}
export default class MLeader implements IGeometry {
    ForEntityName: "MULTILEADER";
    parseEntity(scanner: DxfBaseReader, curr: IGroup): ILeaderEntity;
}
