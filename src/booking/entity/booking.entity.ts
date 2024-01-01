import { Customer } from "src/customer/entity/customer.entity";
import { Seller } from "src/seller/entity/seller.entity";
import { Tour } from "src/tour/entity/tour.entity";
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum STATE {
    WAIT = 0,
    APPROVE = 1,
    CANCEL = 2,
}

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Customer, (customer) => customer.bookings)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @ManyToOne(() => Tour, (tour) => tour.bookings)
    @JoinColumn({ name: 'tour_id' })
    tour: Tour;

    @ManyToOne(() => Seller, (seller) => seller.bookings)
    @JoinColumn({ name: 'seller_id' })
    seller: Seller;

    @Column({ length: 100, nullable: true })
    @Index({ unique: true })
    token: string;

    @Column({ default: STATE.WAIT })
    state: STATE;

    @Column({ name: 'created_at' })
    @CreateDateColumn()
    createdAt: Date;

    @Column({ name: 'updated_at' })
    @UpdateDateColumn()
    updatedAt: Date;
}