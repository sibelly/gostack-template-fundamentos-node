import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions
  }

  // public getBalance(): Balance {
    
  //   let incomeSum = this.transactions.reduce((total, elemento) => {
  //     if (elemento.type === 'income') {
  //       return total += (elemento.value);
  //     } else {
  //       return total
  //     }
  //   }, 0);

  //   let outcomeSum = this.transactions.reduce((total, elemento) => {
  //     if (elemento.type === 'outcome') {
  //       return total -= (elemento.value);
  //     } else {
  //       return total
  //     }
  //   }, 0);

  //   console.log('###testeee', incomeSum, outcomeSum)

  //   // const incomeTotal = this.transactions.reduce( (a, b): Transaction => {
  //   //   return {value: a.value + b.value}; // returns object with property x
  //   // }, 0)

  //   const balance: Balance = {
  //     income: incomeSum,
  //     outcome: outcomeSum,
  //     total: incomeSum + outcomeSum
  //   }
  //   return balance
  // }

  public getBalance(): Balance {
    const transactions = this.transactions; // Aqui temos a lista completa (você pode obter de outra maneira)
    const { income, outcome } = transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += Number(transaction.value);
            break;
          case 'outcome':
            accumulator.outcome += Number(transaction.value);
            break;
          default:
            break;
        }
        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    const total = income - outcome;
    return { income, outcome, total };
  }

  public create(data : Transaction) {
    const transaction = new Transaction(data)
    this.transactions.push(transaction)
    return transaction
  }
}

export default TransactionsRepository;
