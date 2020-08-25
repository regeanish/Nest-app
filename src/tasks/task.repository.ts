import { Repository, EntityRepository } from "typeorm";
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TASK_STATUS } from "./task-status.enum";
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';


@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    async getTasks(filterDto:GetTasksFilterDto):Promise<Task[]> {
        const {status, search} = filterDto;
        // using query builder
        // https://www.google.com/search?q=querybuilder+typeorm&oq=querybuilder+typeorm&aqs=chrome.0.69i59j0l7.5826j0j7&sourceid=chrome&ie=UTF-8
        const query = this.createQueryBuilder('task'); // refering to task entity
        // FILTERING 
        if(status){
         query.andWhere('task.status = :status', {status});   
        };

        if(search){

        };

        const tasks = await query.getMany();
        return tasks;
    }

    async createTask(createTaskDto:CreateTaskDto):Promise<Task> {
        const {title, description} = createTaskDto;
        const task = new Task();
        task.title = title;
        task.descrition = description;
        task.status = TASK_STATUS.OPEN;
        await task.save();
        return task;
    }
}