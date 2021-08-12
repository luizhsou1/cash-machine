import { isIntegerOrFail, isPositiveOrFail } from '../shared/validations-util'
import { ValidationError } from '../domain/errors/validation-error'
import { IMoneyRespository } from './interfaces/imoney-repository'
import { Money } from '../domain/money'
import { constants } from '../shared/constants'

export class CashMachine {
  constructor (
    private readonly moneyRepository: IMoneyRespository
  ) {}

  /**
   * @param valueToWithdraw Valor a ser sacado
   * @throws ValidationError
   * @throws PersistenceError
   */
  async withdraw (valueToWithdraw: number): Promise<Money[]> {
    this.validateValueToWithdrawOrFail(valueToWithdraw)

    const availableMoneys = await this.moneyRepository.getAvailableMoneys('DESC')

    const moneysToWithdraw = this.recursiveWithdraw(valueToWithdraw, availableMoneys)
    const sumMoneys = this.sumMoneys(moneysToWithdraw)

    if (sumMoneys < valueToWithdraw) {
      throw new ValidationError(constants.notExistsEnoughOrFeasibleMoneyInCashMachine)
    }

    for (const money of moneysToWithdraw) {
      const idx = availableMoneys.findIndex((m) => m.value === money.value)
      availableMoneys[idx].remove(money.quantity)
    }

    await this.moneyRepository.save(availableMoneys)

    return moneysToWithdraw
  }

  private validateValueToWithdrawOrFail (value: number): void {
    isPositiveOrFail(value, constants.moneyValueToWithdrawIsNotPositiveError)
    isIntegerOrFail(value, constants.moneyValueToWithdrawIsNotIntergerError)
  }

  /** Função recursiva para obter um array com quantidade de cédulas de cada valor */
  private recursiveWithdraw (valueToWithdraw: number, [currentMoney, ...availableMoneys]: Money[]): Money[] {
    if (valueToWithdraw <= 0 || !currentMoney) return []

    const idealQuantity = Math.floor(valueToWithdraw / currentMoney.value)
    const effectiveQuantity = Math.min(idealQuantity, currentMoney.quantity)
    const effectiveMoneyValue = (currentMoney.value * effectiveQuantity)

    return effectiveQuantity
      ? [
          new Money(currentMoney.value, effectiveQuantity),
          ...this.recursiveWithdraw((valueToWithdraw - effectiveMoneyValue), availableMoneys)
        ]
      : this.recursiveWithdraw((valueToWithdraw - effectiveMoneyValue), availableMoneys)
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
