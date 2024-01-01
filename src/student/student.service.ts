import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm'; 
import { Student } from './student.entity'; 

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private studentRepository: Repository<Student>,
    ) { }

    async findAll(): Promise<Student[]> {
        return await this.studentRepository.find();
    }

    async findSingleStudent(id: number): Promise<Student> {
        const student = await this.findStudent(id); 
        if (!student) {
            throw new Error('Student not found');
        }
        return student;
    }

    async createStudent(student: Student): Promise<Student> {
        const newStudent = await this.studentRepository.create(student);
        return await this.studentRepository.save(newStudent);
    } 

    async deleteStudent(id: number): Promise<Student> {
        const student = await this.findStudent(id); 
        await this.studentRepository.delete(student); 
        return student; 
    }

    async updateStudent(id: number, student: Student): Promise<Student> {
        try {
            const updateStudent = await this.findStudent(id); 
            this.studentRepository.merge(updateStudent, student); 
            return await this.studentRepository.save(updateStudent);
        } catch (error) {
            if (error.name === 'EntityNotFound') {
                throw new NotFoundException('Student not found');
            }
            throw error; 
        }
    }

    private async findStudent(id: number): Promise<Student | undefined> {
        return await this.studentRepository.findOne({ where: { id } as any });
    }
}
