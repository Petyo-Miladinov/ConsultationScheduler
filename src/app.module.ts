import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { EventModule } from './event/event.module';
import { SubjectModule } from './subject/subject.module';
import { ClassModule } from './class/class.module';

@Module({
  controllers: [AppController],
  imports: [StudentModule, TeacherModule, EventModule, SubjectModule, ClassModule]
})
export class AppModule {} 