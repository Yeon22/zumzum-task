import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateCustomerDto } from './dto/customer.dto';
import { CustomerService } from './customer.service';
import { Customer } from './entity/customer.entity';

@Controller('customer')
export class CustomerController {
    constructor(
        private readonly customerService: CustomerService
    ) {}

    @Post()
    @HttpCode(201)
    create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
        return this.customerService.create(createCustomerDto);
    }
}
