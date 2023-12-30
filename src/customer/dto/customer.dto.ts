import {IsMobilePhone, IsString} from '@nestjs/class-validator';

export class CreateCustomerDto {
    @IsString()
    name: string;

    @IsMobilePhone('ko-KR')
    phone: string;
}