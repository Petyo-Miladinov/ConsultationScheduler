import { Student } from "src/student/student.entity";
import { Subject } from "src/subject/subject.entity";
import { Teacher } from "src/teacher/teacher.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @ManyToOne(() => Student)
    @JoinColumn({ name: "student_id" })
    student: Student;

    @ManyToOne(() => Teacher)
    @JoinColumn({ name: "teacher_id" })
    teacher: Teacher;

    @ManyToOne(() => Subject)
    @JoinColumn({ name: "subject_id" })
    subject: Subject;
}