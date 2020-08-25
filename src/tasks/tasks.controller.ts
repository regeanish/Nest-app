import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TASK_STATUS } from './task-status.enum';

@Controller('tasks')
export class TasksController {
    constructor(private _taskService:TasksService) {}

    @Get()
    // ValidationPipe validates the paramerts on GetTasksFilterDto object
    getTasks(@Query(ValidationPipe) filterDto:GetTasksFilterDto):Promise<Task[]> { 
        return this._taskService.getTasks(filterDto);
    }


    @Get('/:id')
     getTaskById(@Param('id', ParseIntPipe) id:number ):Promise<Task> { 
        return this._taskService.getTaskById(id); 
    }


    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto:CreateTaskDto):Promise<Task> { 
        return this._taskService.createTask(createTaskDto); 
    }
    

    @Delete('/:id')
    deleteTaskById(@Param('id', ParseIntPipe) id:number) : Promise<void> { 
        return this._taskService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id:number, 
        @Body('status', TaskStatusValidationPipe) status:TASK_STATUS
        ): Promise<Task> {
        return this._taskService.udpateTaskStatus(id, status);
    }


}
