import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BOOKING_STATE, Booking } from './entity/booking.entity';
import { ApproveBookingDto, CancelBookingDto, CreateBookingDto } from './dto/booking.dto';
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

    findByToken(token: string): Promise<Booking> {
        return this.bookingRepository.findOne({
            where: {
                token
            },
            relations: {
                customer: true
            }
        });
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

    findsByCustomerId(customerId: number): Promise<Booking[]> {
        return this.bookingRepository.find({
            where: {
                customer: {
                    id: customerId
                }
            },
            relations: {
                tour: true
            }
        });
    }

    approve(approveBookingDto: ApproveBookingDto): Promise<Booking> {
        const {booking} = approveBookingDto;
        booking.state = BOOKING_STATE.APPROVE;
        booking.token = randomUUID();
        booking.approvedAt = new Date();

        return this.bookingRepository.save(booking);
    }

    cancel(cancelBookingDto: CancelBookingDto): Promise<Booking> {
        const {booking, customer} = cancelBookingDto;

        if (booking.customer.id !== customer.id) {
            throw new Error('예약정보와 고객정보가 일치하지 않습니다.');
        }

        booking.state = BOOKING_STATE.CANCEL;

        return this.bookingRepository.save(booking);
    }
}
