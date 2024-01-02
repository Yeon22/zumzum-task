import { Body, Controller, HttpCode, Post, Param, BadRequestException, Get, Delete } from '@nestjs/common';
import { CreateCustomerBookingDto, CreateCustomerDto } from './dto/customer.dto';
import { Customer } from './entity/customer.entity';
import { Booking } from 'src/booking/entity/booking.entity';
import { CustomerService } from './customer.service';
import { TourService } from 'src/tour/tour.service';
import { BookingService } from 'src/booking/booking.service';

@Controller('customer')
export class CustomerController {
    constructor(
        private readonly customerService: CustomerService,
        private readonly tourService: TourService,
        private readonly bookingService: BookingService,
    ) {}

    @Post()
    @HttpCode(201)
    create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
        return this.customerService.create(createCustomerDto);
    }

    @Post(':id/tour/:tourId/booking')
    @HttpCode(201)
    async createBooking(@Param('id') id: number, @Param('tourId') tourId: number, @Body() createCustomerBookingDto: CreateCustomerBookingDto): Promise<Booking> {
        const customer = await this.customerService.findById(id);
        if (!customer) {
            throw new BadRequestException('사용자 정보를 찾을 수 없습니다.');
        }

        const tour = await this.tourService.findById(tourId);
        if (!tour) {
            throw new BadRequestException('투어 상품 정보를 찾을 수 없습니다.');
        }

        return this.bookingService.create({...createCustomerBookingDto, customer, tour});
    }

    @Get(':id/booking')
    async findBookings(@Param('id') id: number): Promise<Booking[]> {
        const customer = await this.customerService.findById(id);
        if (!customer) {
            throw new BadRequestException('사용자 정보를 찾을 수 없습니다.');
        }

        return this.bookingService.findsByCustomerId(id);
    }

    @Delete(':id/booking/')
    async cancelBooking(@Param('id') id: number, @Body('token') token: string): Promise<Booking> {
        const customer = await this.customerService.findById(id);
        if (!customer) {
            throw new BadRequestException('사용자 정보를 찾을 수 없습니다.');
        }

        const booking = await this.bookingService.findByToken(token);
        if (!booking) {
            throw new BadRequestException('예약 정보를 찾을 수 없습니다.');
        }

        if (booking.customer.id !== customer.id) {
            throw new BadRequestException('예약정보와 고객정보가 일치하지 않습니다.');
        }

        const afterThreeDays = new Date().getTime() + (3 * 24 * 60 * 60 * 1000);
        if (new Date(booking.tourStartAt).getTime() < afterThreeDays) {
            throw new BadRequestException('여행 3일 전까지만 취소가 가능합니다.');
        }

        return this.bookingService.cancel({customer, booking});
    }
}
