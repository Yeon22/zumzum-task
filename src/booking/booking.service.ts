import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BOOKING_STATE, Booking } from './entity/booking.entity';
import { ApproveBookingDto, CreateBookingDto } from './dto/booking.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>,
    ) {}

    create(createBookingDto: CreateBookingDto): Promise<Booking> {
        const {tour, customer} = createBookingDto;

        const booking = new Booking();
        booking.customer = customer;
        booking.tour = tour;
        booking.seller = tour.seller;
        booking.state = createBookingDto.state;
        booking.tourStartAt = createBookingDto.tourStartAt;
        booking.tourEndAt = new Date(createBookingDto.tourStartAt.getTime() + tour.tour_period * 24 * 60 * 60 * 1000);

        return this.bookingRepository.save(booking);
    }

    findById(id: number): Promise<Booking> {
        return this.bookingRepository.findOne({ where: {id} });
    }

    findsBySellerId(sellerId: number): Promise<Booking[]> {
        return this.bookingRepository.find({
            where: {
                seller: {
                    id: sellerId
                }
            },
            relations: {
                tour: true
            }
        });
    }

    approveBooking(approveBookingDto: ApproveBookingDto): Promise<Booking> {
        const {booking} = approveBookingDto;
        booking.state = BOOKING_STATE.APPROVE;
        booking.token = randomUUID();
        booking.approvedAt = new Date();

        return this.bookingRepository.save(booking);
    }
}
