import { Money } from '../../domain/money'
import { IMoneyRespository, OrderMoneyValue } from '../../domain/interfaces/imoney-repository'

export class MoneyInMemoryRepository implements IMoneyRespository {
  private moneys: Money[]
  constructor () {
    this.moneys = [
      new Money(10, 10),
      new Money(20, 10),
      new Money(50, 10),
      new Money(100, 10)
    ]
  }

  async getAvailableMoneys (orderValue: OrderMoneyValue): Promise<Money[]> {
    return await Promise.resolve(this.moneys
      .sort((a: Money, b: Money) => b.value - a.value))
  }

  async save (moneys: Money[]): Promise<void> {
    this.moneys = moneys
  }
}

/**
 * Implementação em memória do repositório de cédulas de dinheiro
 */
