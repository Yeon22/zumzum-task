import {IsEnum, IsMobilePhone, IsString } from '@nestjs/class-validator';
import { Transform } from 'class-transformer';
import { IsDate, MinDate } from 'class-validator';
import { BOOKING_STATE } from 'src/booking/entity/booking.entity';

export class CreateCustomerDto {
    @IsString()
    name: string;

    @IsMobilePhone('ko-KR')
    phone: string;
}

const bookingMinDate = () => {
    const today = new Date();
    const nextDate = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    nextDate.setHours(0);
    nextDate.setMinutes(0);
    nextDate.setSeconds(0);
    nextDate.setMilliseconds(0);
    return nextDate;
}

export class CreateCustomerBookingDto {
    @IsEnum(BOOKING_STATE)
    state: BOOKING_STATE;

    @Transform(({value}) => new Date(value))
    @IsDate()
    @MinDate(bookingMinDate())
    tourStartAt: Date;
}