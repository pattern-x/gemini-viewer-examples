import { CameraConfig, ModelConfig } from "./Configs";
export interface Project {
    id: string;
    name: string;
    thumbnail?: string;
    camera?: CameraConfig;
    models: ModelConfig[];
}
/**
 * Class for ProjectManager
 * There are two kind of projects:
 * 1) Demo project, which is defined in 'public/config/projects.json', and stored in 'public/three/projects'
 * 2) Common project, which is stored in back-end service (not implemented yet until today 2021.6)
 */
export declare class ProjectManager {
    static customProjects: Project[];
    /**
     * Gets demo projects
     */
    static getSampleProjects(): Promise<Project[]>;
    /**
     * Gets online projects
     * TODO: handle pagging, filter, etc. when there are many projects
     */
    static getCustomProjects(forceRefetch?: boolean): Promise<Project[]>;
    /**
     * Gets a project
     */
    static getProject(id: string): Promise<Project>;
    static addCustomProject(project: Project): Project;
    static deleteCustomProject(projectId: string): void;
}
