import { Controller, Post, HttpCode, Body, Patch, Param } from '@nestjs/common';
import { TourService } from './tour.service';
import { CreateTourDto, UpdateTourHolidayDto } from './dto/tour.dto';
import { Tour } from './entity/tour.entity';

@Controller('tour')
export class TourController {
    constructor(
        private readonly tourService: TourService
    ) {}

    @Post()
    @HttpCode(201)
    create(@Body() createTourDto: CreateTourDto): Promise<Tour> {
        return this.tourService.create(createTourDto);
    }

    @Patch(':id/holiday')
    updateHoliday(@Param('id') id: number, @Body() updateTourHolidayDto: UpdateTourHolidayDto): Promise<Tour> {
        return this.tourService.updateHoliday(id, updateTourHolidayDto);
    }
}
