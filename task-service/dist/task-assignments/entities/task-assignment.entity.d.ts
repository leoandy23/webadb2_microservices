import { Task } from '../../tasks/entities/task.entity';
import { User } from '../../users/entities/user.entity';
export declare class TaskAssignment {
    id: number;
    task_id: Task;
    user_id: User;
    assigned_at: Date;
}
