export interface Annotation {
    id?: string;
    projectId: string;
    name: string;
    content: string;
    creator?: string;
    camera: {
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
    };
}
