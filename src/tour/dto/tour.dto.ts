import { IsInstance } from "@nestjs/class-validator";
import { Tour } from "../entity/tour.entity";
import { Seller } from "src/seller/entity/seller.entity";
import { CreateSellerTourDto, UpdateSellerTourDto } from "src/seller/dto/seller.dto";

export class CreateTourDto extends CreateSellerTourDto {
    @IsInstance(Seller)
    seller: Seller;
}

export class UpdateTourHolidayDto extends UpdateSellerTourDto {
    @IsInstance(Tour)
    tour: Tour;
}