import { Booking } from "src/booking/entity/booking.entity";
import { Seller } from "src/seller/entity/seller.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum STATE {
    NON_USE = 0,
    USE = 1,
}

export enum DAY {
    SUN = 0,
    MON = 1,
    TUE = 2,
    WED = 3,
    THU = 4,
    FRI = 5,
    SAT = 6
}

@Entity()
export class Tour {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Seller, (seller) => seller.tours)
    @JoinColumn({ name: 'seller_id' })
    seller: Seller;

    @OneToMany(() => Booking, (booking) => booking.tour)
    bookings: Booking[];

    @Column({ length: 100 })
    title: string;

    @Column({ length: 255 })
    description: string;

    @Column()
    tour_period: number;

    @Column({ length: 100 })
    location: string;

    @Column({ default: STATE.USE })
    state: STATE;

    @Column({ name: 'holiday_date', nullable: true })
    holidayDate: Date;

    @Column({ name: 'holiday_day', nullable: true })
    holidayDay: DAY;

    @Column({ name: 'holiday_is_repeat', nullable: true})
    holidayIsRepeat: STATE;

    @Column({ name: 'created_at' })
    @CreateDateColumn()
    createdAt: Date;

    @Column({ name: 'updated_at' })
    @UpdateDateColumn()
    updatedAt: Date;
}