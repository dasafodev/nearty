import { IsNotEmpty } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  transaction: string;
  @IsNotEmpty()
  query: string;
  @IsNotEmpty()
  userId: number;
}
