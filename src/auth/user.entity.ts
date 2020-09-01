import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique, OneToMany } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Task } from "src/tasks/task.entity";

@Entity() // I always for to add this
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username:string;

    @Column()
    password:string;
    
    @Column()
    salt:string;

    // eager true allow us to get the tasks once immediately when the user object is fetched
    // only one side of the relationship can be eager, not both
    @OneToMany(type => Task, task => task.user, { eager:true })
    tasks:Task[]

    async validatePassword(userSentPassword:string): Promise<boolean> {
        // 1. apply salt to the password sent by user in post body and generate a hash
        // 2. check if the generated hash is same as the the password. They both should match
        const hash = await bcrypt.hash(userSentPassword, this.salt);
        return hash === this.password;
    }
}