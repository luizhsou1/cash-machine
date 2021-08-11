import { Money } from '../money'

export type OrderMoneyValue = 'ASC' | 'DESC'

export interface IMoneyRespository {
  getAvailableMoneys: (orderValue: OrderMoneyValue) => Promise<Money[]>

  save: (moneys: Money[]) => Promise<void>
}

/**
 * Interface com funções para manipular um repositório de dados de cédulas de dinheiro, é a abstração que a camada
 * de domínio precisa conhecer, onde estas cédulas estão efetivamente persistidas não interessa para esta camada, pode
 * ser em um banco relacional, não relacional, uma api externa, um sistema embarcado de persitência no caixa eletrônico...
 */
