import { User } from '../../users/entities/user.entity';
export declare class Project {
    id: number;
    name: string;
    description: string;
    created_by: User;
    created_at: Date;
    updated_at: Date;
}
