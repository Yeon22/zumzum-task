import {IsEnum, IsMobilePhone, IsString} from '@nestjs/class-validator';
import { IsDate, MinDate } from 'class-validator';
import { BOOKING_STATE } from 'src/booking/entity/booking.entity';

export class CreateCustomerDto {
    @IsString()
    name: string;

    @IsMobilePhone('ko-KR')
    phone: string;
}

export class CreateCustomerBookingDto {
    @IsEnum(BOOKING_STATE)
    state: BOOKING_STATE;

    @IsDate()
    @MinDate(new Date())
    tourStartAt: Date;
}