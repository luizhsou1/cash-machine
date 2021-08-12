import { isIntegerOrFail, isPositiveOrFail } from '../shared/validations-util'
import { ValidationError } from './errors/validation-error'
import { constants } from '../shared/constants'

export enum MoneyValue {
  TEN = 10,
  TWENTY = 20,
  FIFTY = 50,
  ONE_HUNDRED = 100
}
export class Money {
  /**
   * @param value Valor da cédula (ex: [10, 20, 50, 100])
   * @param _quantity Quantidade de cédulas a serem retiradas
   * @throws ValidationError
   */
  constructor (
    readonly value: MoneyValue,
    private quantity: number
  ) {
    this.validateValueOrFail(value)
    this.validateQuantityOrFail(quantity)
  }

  getQuantity (): number {
    return this.quantity
  }

  /** Valores possível para as cédulas de dinheiro */
  static get possibleValues (): number[] {
    const possibleValues: number[] = Object.keys(MoneyValue)
      .filter(key => typeof MoneyValue[key as any] === 'number')
      .map(key => MoneyValue[key as any] as any)
    return possibleValues
  }

  /**
   * @param quantity Quantidade de cédulas a serem retiradas
   * @throws ValidationError
   */
  remove (quantity: number): void {
    this.validateQuantityOrFail(quantity)

    const diffQuantity = this.quantity - quantity
    if (diffQuantity < 0) {
      throw new ValidationError(constants.moneyQuantityExceededLimitError)
    }

    this.quantity -= quantity
  }

  private validateValueOrFail (value: number): void {
    isPositiveOrFail(value, constants.moneyValueIsNotPositiveError)
    isIntegerOrFail(value, constants.moneyValueIsNotIntergerError)

    if (!Money.possibleValues.includes(value)) {
      throw new ValidationError(constants.moneyValueIsNotPossibleValuesError)
    }
  }

  private validateQuantityOrFail (quantity: number): void {
    isPositiveOrFail(quantity, constants.moneyQuantityIsNotPositiveError)
    isIntegerOrFail(quantity, constants.moneyQuantityIsNotIntergerError)
  }
}

/**
 * Classe representando as cédulas de dinheiro dentro do sistema
 */
