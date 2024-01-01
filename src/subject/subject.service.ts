import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './subject.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubjectService {
    constructor(
        @InjectRepository(Subject)
        private subjectRepository: Repository<Subject>,
    ) {}
    
    async findAll(): Promise<Subject[]> {
        return await this.subjectRepository.find();
    }

    async findSingleSubject(id: number): Promise<Subject> {
        const subject = await this.findSubject(id);
        if (!subject) {
            throw new Error('Subject not found');
        }
        return subject;
    }

    async createSubject(subject: Subject): Promise<Subject> {
        const newSubject = await this.subjectRepository.create(subject);
        return await this.subjectRepository.save(newSubject);
    }

    async deleteSubject(id: number): Promise<Subject> {
        const subject = await this.findSubject(id);
        await this.subjectRepository.delete(subject);
        return subject;
    }

    async updateSubject(id: number, subject: Subject): Promise<Subject> {
        const updateSubject = await this.findSubject(id);
        this.subjectRepository.merge(updateSubject, subject);
        return await this.subjectRepository.save(updateSubject);
    }

    async findSubject(id: number): Promise<Subject | undefined> {
        return await this.subjectRepository.findOne({ where: { id } as any });
    }
}
