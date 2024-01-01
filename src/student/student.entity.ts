import { Class } from "src/class/class.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    schoolYear: number;

    @Column()
    classSign: string;

    @Column()
    wholeClass: string;

    @ManyToOne(() => Class, (classEntity) => classEntity.students)
    class: Class;
}

export class StudentDTO {
    name: string;
    email: string;
    schoolYear: number;
    classSign: string;
    wholeClass: string;
}