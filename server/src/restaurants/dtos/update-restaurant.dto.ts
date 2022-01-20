import { CreateRestaurantDto } from './create-restaurant.dto';
import { Field, InputType, PartialType } from '@nestjs/graphql';

//id는 따로 가져올 예정이여서 omit의 createRestaurantDto를 가져옴(OmitType 과 PartialType은 반대)
@InputType()
class UpdateRestaurantInputType extends PartialType(CreateRestaurantDto) {}

@InputType()
export class UpdateRestaurantDto {
  @Field(() => Number)
  id: number;

  @Field(() => UpdateRestaurantInputType)
  data: UpdateRestaurantInputType;
}
