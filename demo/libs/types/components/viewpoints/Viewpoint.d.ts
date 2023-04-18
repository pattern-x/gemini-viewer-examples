export interface Viewpoint {
    id?: string;
    projectId: string;
    name: string;
    position: {
        x: number;
        y: number;
        z: number;
    };
    target: {
        x: number;
        y: number;
        z: number;
    };
}
