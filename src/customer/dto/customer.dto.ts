import {IsEnum, IsMobilePhone, IsString} from '@nestjs/class-validator';
import { STATE } from 'src/booking/entity/booking.entity';

export class CreateCustomerDto {
    @IsString()
    name: string;

    @IsMobilePhone('ko-KR')
    phone: string;
}

export class CreateCustomerBookingDto {
    @IsEnum(STATE)
    state: STATE;
}