import { Money } from '../domain/money'

export const constants = Object.freeze({
  moneyValueIsNotPositiveError: 'Valor da cédula deve ser um número positivo.',
  moneyValueIsNotIntergerError: 'Valor da cédula deve ser um número positivo.',
  moneyValueIsNotPossibleValuesError: `Valor da cédula deve ser um dos seguintes valores: [${Money.possibleValues.toString().replace(/,/g, ', ')}]`,
  moneyQuantityIsNotPositiveError: 'Quantidade de cédulas deve ser um número inteiro.',
  moneyQuantityIsNotIntergerError: 'Quantidade de cédulas deve ser um número positivo.',
  moneyQuantityExceededLimitError: 'Quantidade de cédulas a serem retiradas excedeu o limite de cédulas disponíveis.',
  notExistsEnoughOrFeasibleMoneyInCashMachine: 'Não existe notas suficientes ou factíveis para atender seu pedido neste caixa!'
})
