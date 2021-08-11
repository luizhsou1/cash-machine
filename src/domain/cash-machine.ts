import { ValidationError } from '../domain/errors/validation-error'
import { IMoneyRespository } from './interfaces/imoney-repository'
import { Money } from '../domain/money'
import { constants } from '../shared/constants'

export class CashMachine {
  constructor (
    private readonly moneyRepository: IMoneyRespository
  ) {}

  async withdraw (valueToWithdraw: number): Promise<Money[]> {
    const availableMoneys = await this.moneyRepository.getAvailableMoneys('DESC')

    const moneysToWithdraw = this.recursiveWithdraw(valueToWithdraw, availableMoneys)
    const sumMoneys = this.sumMoneys(moneysToWithdraw)

    if (sumMoneys < valueToWithdraw) {
      throw new ValidationError(constants.notExistsEnoughOrFeasibleMoneyInCashMachine)
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

  private sumMoneys (moneys: Money[]): number {
    return moneys
      .map((money) => money.value * money.quantity)
      .reduce((prev, curr) => prev + curr)
  }

  /**
   * No futuro poderia ter outras funções nessa classe de caixa eletrônico, tais como, depositar, pagar boleto, extrato...
   * comtemplando assim, mais operações fornecidas por um caixa eletrônico
   */
}
