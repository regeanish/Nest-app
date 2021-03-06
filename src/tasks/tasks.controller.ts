import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TASK_STATUS } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private _taskService:TasksService) {}

    @Get()
    // ValidationPipe validates the parameters on GetTasksFilterDto object
    getTasks(
        @Query(ValidationPipe) filterDto:GetTasksFilterDto,
        @GetUser() user:User):Promise<Task[]> { 
        return this._taskService.getTasks(filterDto, user);
    }


    @Get('/:id')
     getTaskById(
         @Param('id', ParseIntPipe) id:number,
         @GetUser() user:User):Promise<Task> { 
        return this._taskService.getTaskById(id, user); 
    }


    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto:CreateTaskDto,
        @GetUser() user:User
    ):Promise<Task> { 
        return this._taskService.createTask(createTaskDto, user); 
    }
    

    @Delete('/:id')
    deleteTaskById(
        @Param('id', ParseIntPipe) id:number,
        @GetUser() user:User
        ) : Promise<void> { 
        return this._taskService.deleteTaskById(id, user);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id:number, 
        @Body('status', TaskStatusValidationPipe) status:TASK_STATUS,
        @GetUser() user:User
        ): Promise<Task> {
        return this._taskService.udpateTaskStatus(id, status, user);
    }


}
