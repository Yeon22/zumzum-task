import { Booking } from "src/booking/entity/booking.entity";
import { Tour } from "src/tour/entity/tour.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Seller {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Tour, (tour) => tour.seller)
    tours: Tour[];

    @OneToMany(() => Booking, (booking) => booking.seller)
    bookings: Booking[];

    @Column({ length: 50 })
    name: string;

    @Column({ length: 30 })
    phone: string;

    @Column({ length: 255 })
    introduce: string;

    @Column({ name: 'created_at' })
    @CreateDateColumn()
    createdAt: Date;

    @Column({ name: 'updated_at' })
    @UpdateDateColumn()
    updatedAt: Date;
}