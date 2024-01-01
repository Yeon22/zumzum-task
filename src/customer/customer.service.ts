import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entity/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/customer.dto';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>
    ) {}

    create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
        const customer = new Customer();
        customer.name = createCustomerDto.name;
        customer.phone = createCustomerDto.phone;

        return this.customerRepository.save(customer);
    }

    findById(id: number): Promise<Customer> {
        return this.customerRepository.findOne({ where: {id} });
    }
}
