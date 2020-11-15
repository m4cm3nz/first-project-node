import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (acumulator: Balance, transaction: Transaction) => {
        const newBalance = { ...acumulator };
        switch (transaction.type) {
          case 'income':
            newBalance.income += transaction.value;
            break;
          case 'outcome':
            newBalance.outcome += transaction.value;
            break;
          default:
            break;
        }
        return newBalance;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return { income, outcome, total: income - outcome };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const trasaction = new Transaction({ title, value, type });
    this.transactions.push(trasaction);
    return trasaction;
  }
}

export default TransactionsRepository;
