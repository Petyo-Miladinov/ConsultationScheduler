import { Body, Controller, Get, Post, Put, Delete, NotFoundException, Param } from '@nestjs/common';
import { ClassService } from './class.service';
import { Class } from './class.entity';

@Controller('class')
export class ClassController {
    constructor(private readonly classService:ClassService) { }

    @Get()
    async findAll(): Promise<Class[]> {
        return await this.classService.findAll();
    }

    @Get(':id')
    async getClass(@Param('id') id: string): Promise<Class> {
        const studcClass = await this.classService.findSingleClass(+id);
        if (!studcClass) {
            throw new NotFoundException(`Class with id ${id} not found`);
        }
        return studcClass;
    }

    @Post()
    async createClass(@Body() studcClass: Class): Promise<Class> {
        return await this.classService.createClass(studcClass);
    }

    @Put(':id')
    async updateClass(@Param('id') id: number, @Body() studcClass: Class): Promise<Class> {
        return await this.classService.updateClass(id, studcClass);
    }

    @Delete(':id')
    async deleteClass(@Param('id') id: number): Promise<void> {
        const studcClass = await this.classService.findSingleClass(id);
        if (!studcClass) {
            throw new Error('User not found');
        }
        this.classService.deleteClass(id);
    }
}
