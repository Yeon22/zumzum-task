import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entity/booking.entity';
import { CreateBookingDto } from './dto/booking.dto';

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>,
    ) {}

    async create(createBookingDto: CreateBookingDto): Promise<Booking> {
        const {tour, customer} = createBookingDto;

        const booking = new Booking();
        booking.customer = customer;
        booking.tour = tour;
        booking.seller = tour.seller;
        booking.state = createBookingDto.state;

        return this.bookingRepository.save(booking);
    }
}
