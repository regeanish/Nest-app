import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.interface';

@Controller('tasks')
export class TasksController {
    constructor(private _taskService:TasksService) {}

    @Get()
    private getAllTasks():Task[] { return this._taskService.getAllTasks(); }
}
