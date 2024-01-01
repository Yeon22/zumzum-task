import { IsInstance } from "@nestjs/class-validator";
import { Customer } from "src/customer/entity/customer.entity";
import { Tour } from "src/tour/entity/tour.entity";
import { CreateCustomerBookingDto } from "src/customer/dto/customer.dto";

export class CreateBookingDto extends CreateCustomerBookingDto {
    @IsInstance(Customer)
    customer: Customer;

    @IsInstance(Tour)
    tour: Tour;
}