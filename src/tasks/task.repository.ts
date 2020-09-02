import { Repository, EntityRepository } from "typeorm";
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TASK_STATUS } from "./task-status.enum";
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';


@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    private _logger = new Logger('TaskRepository');

    async getTasks(filterDto:GetTasksFilterDto, user:User):Promise<Task[]> {
        const {status, search} = filterDto;
        // using query builder
        // https://www.google.com/search?q=querybuilder+typeorm&oq=querybuilder+typeorm&aqs=chrome.0.69i59j0l7.5826j0j7&sourceid=chrome&ie=UTF-8
        const query = this.createQueryBuilder('task'); // refering to task entity
        
        query.where('task.userId = :userId', {userId:user.id});
        
        // FILTERING 
        if(status){
            // where can also be used here but it will overwrite any other where clauses. to make search and status wrok together, make use of andWhere
            // andWhere is equivalent to && operator in most programming languages.
            query.andWhere('task.status = :status', {status});   
        };
        if(search) query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', {search: `%${search}%`});
        
        try {
            const tasks = await query.getMany();
            return tasks;
        } catch (error) {
            this._logger.error(`Failed to get tasks for user "${user.username}", Filters: ${JSON.stringify(filterDto)}`, error.stack);
            throw new InternalServerErrorException();
        }
    }

    async createTask(createTaskDto:CreateTaskDto, user:User):Promise<Task> {
        const {title, description} = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TASK_STATUS.OPEN;
        task.user = user;
        try {
            await task.save();
        } catch (error) {
            this._logger.error(`Failed to create a task for user ${user.username}, Data: ${JSON.stringify(createTaskDto)}`);
            throw new InternalServerErrorException();
        }
        
        delete task.user;
        return task;
    }
}