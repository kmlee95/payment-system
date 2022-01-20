import { UpdateRestaurantDto } from './dtos/update-restaurant.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>, //repository 를 등록 함으로써 db에 접근 가능(find, save etc..)
  ) {}

  getAll(): Promise<Restaurant[]> {
    return this.restaurants.find();
  }

  // create(인스턴스를 생성), save(인스턴스를 저장)의 차이 -> create는 db를 건들지 않음. save는 접근
  createRestaurant(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    const newRestaurant = this.restaurants.create(createRestaurantDto);
    return this.restaurants.save(newRestaurant);
  }

  updateRestaurant({ id, data }: UpdateRestaurantDto) {
    return this.restaurants.update(id, { ...data });
  }
}
