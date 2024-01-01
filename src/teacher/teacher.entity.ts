import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    subject: string; 
}

export class TeacherDTO {
    name: string;
    email: string;
    subject: string;
}