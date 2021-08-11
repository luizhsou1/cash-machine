import { ValidationError } from './errors/validation-error'

export class Money {
  constructor (
    readonly value: number,
    private _quantity: number
  ) {}

  get quantity (): number {
    return this._quantity
  }

  remove (quantity: number): void {
    console.log(this.value, this.quantity, quantity, Number.isInteger(quantity))

    // Validações a nível de erros de lógica no desenvolvimento, teoricamente não devem ocorrer
    if (quantity <= 0) {
      throw new ValidationError('Quantidade de cédulas a serem retiradas deve ser um valor positivo.')
    }

    if (!Number.isInteger(quantity)) {
      throw new ValidationError('Quantidade de cédulas a serem retiradas deve ser um valor inteiro.')
    }

    const diffAmount = this._quantity - quantity
    if (diffAmount < 0) {
      throw new ValidationError('Quantidade de cédulas a serem retiradas excedeu o limite de cédulas disponíveis.')
    }

    this._quantity -= quantity
  }
}

/**
 * Classe representando as cédulas de dinheiro dentro do sistema
 */
