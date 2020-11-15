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
    let balance = {
      income: 0,
      outcome: 0,
      total: 0,
    } as Balance;

    balance = this.transactions.reduce((balanceResult, transaction) => {
      const income =
        +balanceResult.income +
        +(transaction.type === 'income' ? transaction.value : 0);

      const outcome =
        +balanceResult.outcome +
        +(transaction.type === 'outcome' ? transaction.value : 0);

      return {
        income,
        outcome,
        total: income + outcome * (transaction.type === 'outcome' ? -1 : 1),
      } as Balance;
    }, balance);

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const trasaction = new Transaction({ title, value, type });
    this.transactions.push(trasaction);
    return trasaction;
  }
}

export default TransactionsRepository;
