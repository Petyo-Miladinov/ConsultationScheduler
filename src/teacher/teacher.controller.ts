import { Body, Controller, Get, Post, Put, Delete, NotFoundException, Param } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { Teacher } from './teacher.entity';

@Controller('teacher')
export class TeacherController {
    constructor(private readonly teacherService:TeacherService) { } 

    @Get() 
    async findAll(): Promise<Teacher[]> {
        return await this.teacherService.findAll();
    } 

    @Get(':id')
    async getTeacher(@Param('id') id: string): Promise<Teacher> {
        const teacher = await this.teacherService.findSingleTeacher(+id); 
        if (!teacher) {
            throw new NotFoundException(`Teacher with id ${id} not found`);
        }
        return teacher; 
    } 

    @Post() 
    async createTeacher(@Body() teacher: Teacher): Promise<Teacher> {
        return await this.teacherService.createTeacher(teacher);
    } 

    @Put(':id')
    async updateTeacher(@Param('id') id: number, @Body() teacher: Teacher): Promise<Teacher> {
        return await this.teacherService.updateTeacher(id, teacher);
    } 

    @Delete(':id') 
    async deleteTeacher(@Param('id') id: number): Promise<void> {
        const teacher = await this.teacherService.findSingleTeacher(id);
        if (!teacher) {
            throw new Error('User not found'); 
        } 
        this.teacherService.deleteTeacher(id); 
    }
}
