import { Project } from '../../projects/entities/project.entity';
import { TaskStatus } from '../task-status.enum';
export declare class Task {
    id: number;
    project_id: Project;
    title: string;
    description: string;
    status: TaskStatus;
    created_at: Date;
    updated_at: Date;
}
