import { Restaurant } from './../entities/restaurant.entity';
import { InputType, OmitType } from '@nestjs/graphql';

//input type 정의
@InputType()
export class CreateRestaurantDto extends OmitType(
  //OmitType은 [~]를 제외하고 만듬
  //마지막 InputType을 넣는 이유 => entity에서 InputType이 아닌 ObjectType 사용
  Restaurant,
  ['id'],
  InputType,
) {}
