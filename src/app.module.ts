import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { SellerModule } from './seller/seller.module';
import { TourModule } from './tour/tour.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
    }),
    CustomerModule,
    SellerModule,
    TourModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
