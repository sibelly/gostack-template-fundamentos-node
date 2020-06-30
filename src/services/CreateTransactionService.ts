import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(data: Transaction) {
    const transaction = this.transactionsRepository.create(data)
    const { total } = this.transactionsRepository.getBalance()
    if ( data.type === "outcome" && total < data.value) {
      throw Error("You do not have enough balance!")
    }
    return transaction
  }
}

export default CreateTransactionService;
