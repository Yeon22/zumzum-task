import { IsDate, IsInt, IsOptional, IsString } from "@nestjs/class-validator";
import { DAY, STATE } from "../entity/tour.entity";

export class CreateTourDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsInt()
    tour_period: number;

    @IsString()
    location: string;

    @IsInt()
    seller_id: number;
}

export class UpdateTourHolidayDto {
    @IsDate()
    @IsOptional()
    holidayDate: Date;

    @IsInt()
    @IsOptional()
    holidayDay: DAY;

    @IsInt()
    holidayIsRepeat: STATE;
}