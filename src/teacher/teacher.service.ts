import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherService {
    constructor(
        @InjectRepository(Teacher)
        private teacherRepository: Repository<Teacher>,
    ) { }

    async findAll(): Promise<Teacher[]> {
        return await this.teacherRepository.find();
    }

    async findSingleTeacher(id: number): Promise<Teacher> {
        const teacher = await this.findTeacher(id);
        if (!teacher) {
            throw new NotFoundException('Teacher not found');
        }
        return teacher;
    }

    async createTeacher(teacher: Teacher): Promise<Teacher> {
        const newTeacher = await this.teacherRepository.create(teacher);
        return await this.teacherRepository.save(newTeacher);
    }

    async deleteTeacher(id: number): Promise<Teacher> {
        const teacher = await this.findTeacher(id);
        await this.teacherRepository.delete(teacher);
        return teacher;
    } 

    async updateTeacher(id: number, teacher: Teacher): Promise<Teacher> {
        try {
            const updatedTeacher = await this.findTeacher(id);
            this.teacherRepository.merge(updatedTeacher, teacher);
            return await this.teacherRepository.save(updatedTeacher);
        } catch (error) {
            if (error.name === 'EntityNotFound') {
                throw new NotFoundException('Teacher not found');
            }
            throw error;
        }
    } 

    private async findTeacher(id: number): Promise<Teacher | undefined> {
        return await this.teacherRepository.findOne({ where: { id } as any });
    }
}
