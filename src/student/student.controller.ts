import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.entity';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) { } 

    @Get() 
    async findAll(): Promise<Student[]> {
        return this.studentService.findAll();
    }

    @Get(':id') 
    async getStudent(@Param('id') id: string): Promise<Student> {
        const student = await this.studentService.findSingleStudent(+id); 
        if (!student) {
            throw new NotFoundException(`Student with id ${id} not found`);
        }
        return student; 
    }

    @Post()
    async createStudent(@Body() student:Student): Promise<Student> {
        return await this.studentService.createStudent(student); 
    } 

    @Put(':id') 
    async updateStudent(@Param('id') id: number, @Body() student: Student): Promise<Student> {
        return await this.studentService.updateStudent(id, student);
    }

    @Delete(':id') 
    async deleteStudent(@Param('id') id: number): Promise<void> {
        const student = await this.studentService.findSingleStudent(id);
        if (!student) {
            throw new Error('User not found'); 
        } 
        this.studentService.deleteStudent(id); 
    } 
}
