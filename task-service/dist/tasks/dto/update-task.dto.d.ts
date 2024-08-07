import { TaskStatus } from '../task-status.enum';
export declare class UpdateTaskDto {
    title?: string;
    description?: string;
    status?: TaskStatus;
    project_id?: number;
}
