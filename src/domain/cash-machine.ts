import { ValidationError } from '../domain/errors/validation-error'
import { IMoneyRespository } from './interfaces/imoney-repository'
import { MoneyInMemoryRepository } from '../infra/repositories/money-in-memory-repository'
import { Money } from '../domain/money'

export class CashMachine {
  constructor (
    private readonly moneyRepository: IMoneyRespository
  ) {}

  async withdraw (valueToWithdraw: number): Promise<Money[]> {
    const availableMoneys = await this.moneyRepository.getAvailableMoneys('DESC')

    const moneysToWithdraw = this.recursiveWithdraw(valueToWithdraw, availableMoneys)
    const sum = moneysToWithdraw
      .map((money) => money.value * money.quantity)
      .reduce((prev, curr) => prev + curr)

    if (sum < valueToWithdraw) {
      throw new ValidationError('Não existe notas suficientes ou factíveis para atender seu pedido neste caixa!')
    }

    availableMoneys.forEach((money, idx) => moneysToWithdraw[idx].quantity && money.remove(moneysToWithdraw[idx].quantity))
    await this.moneyRepository.save(availableMoneys)

    return moneysToWithdraw
  }

  private recursiveWithdraw (valueToWithdraw: number, [currentMoney, ...availableMoneys]: Money[]): Money[] {
    if (!currentMoney) return []

    const idealQuantity = Math.floor(valueToWithdraw / currentMoney.value)
    const effectiveQuantity = Math.min(idealQuantity, currentMoney.quantity)
    const effectiveMoneyValue = (currentMoney.value * effectiveQuantity)

    return [
      new Money(currentMoney.value, effectiveQuantity),
      ...this.recursiveWithdraw((valueToWithdraw - effectiveMoneyValue), availableMoneys)
    ]
  }

  /**
   * No futuro poderia ter outras funções nessa classe de caixa eletrônico, tais como depositar, pagar boleto, extrato...
   * comtemplando assim, mais operações fornecidas por um caixa eletrônico
   */
}

const cashMachine = new CashMachine(new MoneyInMemoryRepository())
// eslint-disable-next-line @typescript-eslint/no-floating-promises
cashMachine.withdraw(190)
  .then((moneys) => console.log(moneys))
