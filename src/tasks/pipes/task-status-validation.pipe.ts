import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TASK_STATUS } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses  = [
        TASK_STATUS.OPEN,
        TASK_STATUS.IN_PROGRESS,
        TASK_STATUS.DONE
    ];
    
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    transform(value:any){
        value = value.toUpperCase();
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`"${value}" is an invalid status`);
        }
        return value;
    }

    private isStatusValid(status: any) {
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }
}