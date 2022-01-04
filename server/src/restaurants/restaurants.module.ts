import { RestaurantService } from './restaurants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { RestaurantResolver } from './restaurants.resolver';
import { Restaurant } from './entities/restaurant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant])], //Entity class 가 여러개면 여러개를 등록한다.
  providers: [RestaurantResolver, RestaurantService],
})
export class RestaurantsModule {}
