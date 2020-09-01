import { Repository, EntityRepository } from "typeorm";
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TASK_STATUS } from "./task-status.enum";
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';


@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    async getTasks(filterDto:GetTasksFilterDto):Promise<Task[]> {
        const {status, search} = filterDto;
        // using query builder
        // https://www.google.com/search?q=querybuilder+typeorm&oq=querybuilder+typeorm&aqs=chrome.0.69i59j0l7.5826j0j7&sourceid=chrome&ie=UTF-8
        const query = this.createQueryBuilder('task'); // refering to task entity
        // FILTERING 
        if(status){
            // where can also be used here but it will overwrite any other where clauses. to make search and status together, make use of andWhere
            // andWhere is equivalent to && operator in most programming languages.
            query.andWhere('task.status = :status', {status});   
        };
        if(search) query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', {search: `%${search}%`});
        const tasks = await query.getMany();
        return tasks;
    }

    async createTask(createTaskDto:CreateTaskDto, user:User):Promise<Task> {
        const {title, description} = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TASK_STATUS.OPEN;
        task.user = user;
        await task.save();
        delete task.user;
        return task;
    }
}