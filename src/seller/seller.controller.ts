import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SellerService } from './seller.service';
import { CreateSellerDto } from './dto/seller.dto';
import { Seller } from './entity/seller.entity';

@Controller('seller')
export class SellerController {
    constructor(
        private readonly sellerService: SellerService
    ) {}

    @Post()
    @HttpCode(201)
    create(@Body() createSellerDto: CreateSellerDto): Promise<Seller> {
        return this.sellerService.create(createSellerDto);
    }
}
