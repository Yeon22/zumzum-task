import { IsMobilePhone, IsString } from "@nestjs/class-validator";

export class CreateSellerDto {
    @IsString()
    name: string;

    @IsMobilePhone('ko-KR')
    phone: string;

    @IsString()
    introduce: string;
}