import { Restaurant } from './../entities/restaurant.entity';
import { InputType, OmitType } from '@nestjs/graphql';

//input type 정의
@InputType()
export class CreateRestaurantDto extends OmitType(
  Restaurant,
  ['id'],
  InputType,
) {}
