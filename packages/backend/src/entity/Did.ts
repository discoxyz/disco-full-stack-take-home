import {Maximum, MaxLength, Minimum, Property, Required} from "@tsed/schema";
import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn} from "typeorm";

@Entity()
export class Did {

    @PrimaryColumn()
    @Property()
    id: string;

    @Column()
    @MaxLength(100)
    @Required()
    did: string;

}