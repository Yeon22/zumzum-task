import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from './entity/seller.entity';
import { Repository } from 'typeorm';
import { CreateSellerDto } from './dto/seller.dto';

@Injectable()
export class SellerService {
    constructor(
        @InjectRepository(Seller)
        private readonly sellerRepository: Repository<Seller>
    ) {}

    create(createSellerDto: CreateSellerDto): Promise<Seller> {
        const seller = new Seller();
        seller.name = createSellerDto.name;
        seller.phone = createSellerDto.phone;
        seller.introduce = createSellerDto.introduce;

        return this.sellerRepository.save(seller);
    }

    findById(id: number): Promise<Seller> {
        return this.sellerRepository.findOne({where: {id}})
    }
}
