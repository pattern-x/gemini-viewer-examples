import createEdgesGeometryWorker from "./CreateEdgesGeometry.worker.ts";
export declare class CreateEdgesGeometryWorker {
    worker: createEdgesGeometryWorker;
    geometries: Map<string, any>;
    loadedGeometries: Map<string, number[]>;
    private jobCount;
    constructor();
    add(id: string, data: Record<string, any>): void;
    get(id: string): any;
    init(): void;
    postMessage(data: any): void;
}
