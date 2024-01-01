import { IsMobilePhone, IsString, IsInt, MinDate, IsDate, IsOptional, IsEnum } from "@nestjs/class-validator";
import { DAY, TOUR_STATE } from "src/tour/entity/tour.entity";

export class CreateSellerDto {
    @IsString()
    name: string;

    @IsMobilePhone('ko-KR')
    phone: string;

    @IsString()
    introduce: string;
}

export class CreateSellerTourDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsInt()
    tour_period: number;

    @IsString()
    location: string;
}

export class UpdateSellerTourDto {
    @IsDate()
    @MinDate(new Date())
    @IsOptional()
    holidayDate: Date;

    @IsInt()
    @IsOptional()
    holidayDay: DAY;

    @IsEnum(TOUR_STATE)
    holidayIsRepeat: TOUR_STATE;
}