import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from './class.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClassService {
    constructor(
        @InjectRepository(Class)
        private classRepository: Repository<Class>,
    ) { }

    async findAll(): Promise<Class[]> {
        return await this.classRepository.find();
    }

    async findSingleClass(id: number): Promise<Class> {
        const studcClass = await this.findClass(id);
        if (!studcClass) {
            throw new Error('Class not found');
        }
        return studcClass;
    }

    async createClass(studcClass: Class): Promise<Class> {
        const newClass = await this.classRepository.create(studcClass);
        return await this.classRepository.save(newClass);
    }

    async deleteClass(id: number): Promise<Class> {
        const studcClass = await this.findClass(id);
        await this.classRepository.delete(studcClass);
        return studcClass;
    }

    async updateClass(id: number, studcClass: Class): Promise<Class> {
        try {
            const updateClass = await this.findClass(id);
            this.classRepository.merge(updateClass, studcClass);
            return await this.classRepository.save(updateClass);
        } catch (error) {
            if (error.name === 'EntityNotFound') {
                throw new NotFoundException('Class not found');
            }
            throw error;
        }
    }

    async findClass(id: number): Promise<Class | undefined> {
        return await this.classRepository.findOne({ where: { id } as any });
    }
}
