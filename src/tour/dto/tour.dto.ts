import { IsInt, IsString } from "@nestjs/class-validator";

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