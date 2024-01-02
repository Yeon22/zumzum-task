import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
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
        booking.token = createBookingDto.token;
        booking.tourEndAt = new Date(createBookingDto.tourStartAt.getTime() + tour.tour_period * 24 * 60 * 60 * 1000);
        if (createBookingDto.token) {
            booking.approvedAt = new Date();
            booking.state = BOOKING_STATE.APPROVE;
        }

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

    findTodayApprovedBookingCountByTourId(tourId: number): Promise<number> {
        const today = () => {
            const date = new Date();
            return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        }
        const start = new Date(`${today()} 00:00:00`);
        const end = new Date(`${today()} 23:59:59`);

        return this.bookingRepository.count({
            where: {
                state: BOOKING_STATE.APPROVE,
                approvedAt: Between(start, end),
                tour: {
                    id: tourId
                },
            },
        });
    }

    async findsAvailableDates(customerId: number, month: number): Promise<number[]> {
        const fullYear = new Date().getFullYear();
        const startDate = new Date(fullYear, month - 1, 1);
        const endDate = new Date(fullYear, month, 0);
        const dates = new Array(endDate.getDate()).fill(9).map((v, i) => i + 1);
        
        const bookings = await this.bookingRepository.find({
            where: {
                tourStartAt: Between(startDate, endDate),
                customer: {
                    id: customerId
                }
            }
        });

        const bookingTourDates = new Set(bookings.map(b => {
            const tourStartDate = new Date(b.tourStartAt).getDate();
            const tourEndDate = new Date(b.tourEndAt).getDate();
            return new Array(tourEndDate + 1 - tourStartDate).fill(0).map((_, i) => tourStartDate + i);
        }).flat());

        return dates.filter(d => !bookingTourDates.has(d));
    }

    approve(approveBookingDto: ApproveBookingDto): Promise<Booking> {
        const {booking} = approveBookingDto;
        booking.state = BOOKING_STATE.APPROVE;
        booking.token = randomUUID();
        booking.approvedAt = new Date();

        return this.bookingRepository.save(booking);
    }

    cancel(cancelBookingDto: CancelBookingDto): Promise<Booking> {
        const {booking} = cancelBookingDto;

        booking.state = BOOKING_STATE.CANCEL;

        return this.bookingRepository.save(booking);
    }
}
