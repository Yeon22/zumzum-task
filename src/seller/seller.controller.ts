import { Body, Controller, HttpCode, Post, Param, BadRequestException, Patch } from '@nestjs/common';
import { Seller } from './entity/seller.entity';
import { Tour } from 'src/tour/entity/tour.entity';
import { SellerService } from './seller.service';
import { TourService } from 'src/tour/tour.service';
import { CreateSellerDto, CreateSellerTourDto, UpdateSellerTourDto } from './dto/seller.dto';

@Controller('seller')
export class SellerController {
    constructor(
        private readonly sellerService: SellerService,
        private readonly tourService: TourService
    ) {}

    @Post()
    @HttpCode(201)
    create(@Body() createSellerDto: CreateSellerDto): Promise<Seller> {
        return this.sellerService.create(createSellerDto);
    }

    @Post(':id/tour')
    @HttpCode(201)
    async createTour(@Param('id') id: number, @Body() createSellerTourDto: CreateSellerTourDto): Promise<Tour> {
        const seller = await this.sellerService.findById(id);
        if (!seller) {
            throw new BadRequestException('판매자 정보를 찾을 수 없습니다.');
        }

        return this.tourService.create({...createSellerTourDto, seller})
    }

    @Patch(':id/tour/:tourId/holiday')
    async updateTourHoliday(@Param('id') id: number, @Param('tourId') tourId: number, @Body() updateSellerTourDto: UpdateSellerTourDto): Promise<Tour> {
        const seller = await this.sellerService.findById(id);
        if (!seller) {
            throw new BadRequestException('판매자 정보를 찾을 수 없습니다.');
        }

        const tour = await this.tourService.findById(tourId);
        if (!tour) {
            throw new BadRequestException('투어 상품 정보를 찾을 수 없습니다.');
        }

        return this.tourService.updateHoliday({...updateSellerTourDto, tour});
    }
}
