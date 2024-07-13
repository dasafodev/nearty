import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createTransactionDto: CreateTransactionDto) {
    const user = await this.userRepository.findOne({
      where: { id: createTransactionDto.userId },
    });
    const newTransaction = this.transactionRepository.create({
      user: user,
      query: createTransactionDto.query,
      transaction: createTransactionDto.transaction,
    });
    return this.transactionRepository.save(newTransaction);
  }

  async findAll(userId: string) {
    const id = parseInt(userId);
    const user = await this.userRepository.find({ where: { id } });
    return this.transactionRepository.find({ where: { user } });
  }
}
