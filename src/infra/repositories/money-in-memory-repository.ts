import { Money, MoneyValue } from '../../domain/money'
import { IMoneyRespository, OrderMoneyValue } from '../../domain/interfaces/imoney-repository'

export class MoneyInMemoryRepository implements IMoneyRespository {
  private moneys: Money[]
  constructor () {
    // Valores iniciais (Totalizando R$ 4.000,00)
    this.moneys = [
      new Money(MoneyValue.TEN, 100),
      new Money(MoneyValue.TWENTY, 50),
      new Money(MoneyValue.FIFTY, 20),
      new Money(MoneyValue.ONE_HUNDRED, 10)
    ]
  }

  async getAvailableMoneys (orderValue: OrderMoneyValue): Promise<Money[]> {
    return await Promise.resolve(this.moneys
      .sort((a: Money, b: Money) => orderValue === 'ASC' ? (a.value - b.value) : (b.value - a.value)))
  }

  async save (moneys: Money[]): Promise<void> {
    this.moneys = moneys
  }
}

/**
 * Implementação em memória do repositório de cédulas de dinheiro
 */
