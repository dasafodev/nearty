import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateTransactionDto {
  @IsNotEmpty()
  transaction: string;
  @IsNotEmpty()
  query: string;
  @IsNotEmpty()
  user: User;
}
