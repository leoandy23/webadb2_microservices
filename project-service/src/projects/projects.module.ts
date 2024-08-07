import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { User } from '../users/entities/user.entity'; // Importar entidad User para relaciones

@Module({
  imports: [TypeOrmModule.forFeature([Project, User])], // Asegúrate de incluir las entidades necesarias
  providers: [ProjectsService],
  controllers: [ProjectsController],
  exports: [TypeOrmModule],
})
export class ProjectsModule {}
