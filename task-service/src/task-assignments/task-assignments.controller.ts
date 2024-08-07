import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TaskAssignmentsService } from './task-assignments.service';
import { CreateTaskAssignmentDto } from './dto/create-task-assignment.dto';
import { UpdateTaskAssignmentDto } from './dto/update-task-assignment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('task-assignments')
@UseGuards(JwtAuthGuard)
@Controller('task-assignments')
export class TaskAssignmentsController {
  constructor(
    private readonly taskAssignmentsService: TaskAssignmentsService,
  ) {}

  @Post()
  create(@Body() createTaskAssignmentDto: CreateTaskAssignmentDto) {
    return this.taskAssignmentsService.create(createTaskAssignmentDto);
  }

  @Get()
  findAll() {
    return this.taskAssignmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskAssignmentsService.findOne(+id);
  }

  @Patch(':idtask')
  update(
    @Param('idtask') idtask: string,
    @Body() updateTaskAssignmentDto: UpdateTaskAssignmentDto,
  ) {
    return this.taskAssignmentsService.update(+idtask, updateTaskAssignmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskAssignmentsService.remove(+id);
  }
}
