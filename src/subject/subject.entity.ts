import { Class } from "src/class/class.entity";
import { Teacher } from "src/teacher/teacher.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"; 

@Entity()
export class Subject {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Teacher)
    @JoinColumn({ name: "teacher_id" })
    teacher: Teacher;

    @ManyToOne(() => Class)
    @JoinColumn({ name: "class_id" })
    class: Class;
}