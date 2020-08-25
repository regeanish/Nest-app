import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { TASK_STATUS } from './task-status.enum';

@Entity()
export class Task extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    descrition:string;

    @Column()
    status:TASK_STATUS;


}