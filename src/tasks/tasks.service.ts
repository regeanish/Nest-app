import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
//import { v4 as uuidv4 } from 'uuid';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TASK_STATUS } from './task-status.enum';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private _taskRepository:TaskRepository
    ){}


    public getTasks(filterDto:GetTasksFilterDto, user:User):Promise<Task[]> {
        return this._taskRepository.getTasks(filterDto, user);
    }

    public async getTaskById(id:number, user:User):Promise<Task>{
        // https://typeorm.delightful.studio/classes/_repository_repository_.repository.html
        const found = await this._taskRepository.findOne({where: {id, userId:user.id}});
        if(!found) throw new NotFoundException(`Task with ID ${id} not found for the user`);
        return found;
    }

    public async createTask(createTaskDto:CreateTaskDto, user:User):Promise<Task>{
        return await this._taskRepository.createTask(createTaskDto, user);
    }

    public async deleteTaskById(id:number, user:User):Promise<void> {
        const result = await this._taskRepository.delete({id, userId: user.id});
        if(result.affected === 0) throw new NotFoundException(`Task with ID ${id} not found`);
    }

     public async udpateTaskStatus(
         id:number, status:TASK_STATUS, user:User): Promise<Task> {
        const task = await this.getTaskById(id, user);
        task.status = status;
        await task.save();
        return task;
    }























    // private _tasks:Task[] = [];

    // public getAllTasks(): Task[] { return this._tasks; }

    // public getTasksWithFilters(filterDto:GetTasksFilterDto): Task[] {
    //     const {status, search} = filterDto;
    //     let tasks = this.getAllTasks();
    //     if(status) tasks = tasks.filter(task => task.status === status);
    //     if(search){
    //         tasks = tasks.filter(task => 
    //         task.title.includes(search) || task.description.includes(search),    
    //         );
    //     }
    //     return tasks;
    // }

    // public getTaskById(id:string):Task {
    //     const task = this._tasks.find(task => task.id === id);
    //     if(!task) throw new NotFoundException(`Task with ID ${id} not found`);
    //     return task;
    // }

    
    // public createTask(createTaskDto:CreateTaskDto):Task {
    //     // ES6 syntax, only extract the values which exist in the dto object
    //     const {title, description } = createTaskDto; 
    //     const task: Task = {
    //         id: uuidv4(),
    //         title, // es6 way of assigning when key and value both have the same name
    //         description,
    //         status:TASK_STATUS.OPEN
    //     }
    //     this._tasks.push(task);
    //     return task; // its best to always return the newly created task so that frontend can have it and avoid a new rest call for it
    // }
    

    // public deleteTaskById(id:string):void {
    //     const found = this.getTaskById(id);
    //     this._tasks = this._tasks.filter(task => task.id !== found.id);
    // }

    // public udpateTaskStatus(id:string, status:TASK_STATUS): Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }

}
