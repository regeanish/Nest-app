import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import { TASK_STATUS } from './task-status.enum';
import { User } from '../auth/user.entity';

@Entity()
export class Task extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    description:string;

    @Column()
    status:TASK_STATUS;

    // one user can have many tasks
    @ManyToOne(type => User, user => user.tasks, { eager: false })
    user:User


}