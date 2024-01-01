import { Body, Controller, Get, Post, Put, Delete, NotFoundException, Param } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { Subject } from './subject.entity';

@Controller('subject')
export class SubjectController {
    constructor(private readonly subjectService:SubjectService) {} 

    @Get()
    async findAll(): Promise<Subject[]> {
        return await this.subjectService.findAll();
    }

    @Get(':id')
    async getSubject(@Param('id') id: string): Promise<Subject> {
        const subject = await this.subjectService.findSingleSubject(+id);
        if (!subject) {
            throw new NotFoundException(`Subject with id ${id} not found`);
        }
        return subject;
    }

    @Post()
    async createSubject(@Body() subject: Subject): Promise<Subject> {
        return await this.subjectService.createSubject(subject);
    }

    @Put(':id')
    async updateSubject(@Param('id') id: number, @Body() subject: Subject): Promise<Subject> {
        return await this.subjectService.updateSubject(id, subject);
    }

    @Delete(':id')
    async deleteSubject(@Param('id') id: number): Promise<void> {
        const subject = await this.subjectService.findSingleSubject(id);
        if (!subject) {
            throw new Error('User not found');
        }
        this.subjectService.deleteSubject(id);
    }
}
