import { User } from "./auth";

export interface Comment {
    id: number;
    task_id: number;
    user: User;
    comment: string;
}
