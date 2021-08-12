import { Money } from '../money'

export type OrderMoneyValue = 'ASC' | 'DESC'

export interface IMoneyRespository {
  /**
   * Função responsável por obter do repositório, cédulas disponíveis com suas respectivas quantidades
   */
  getAvailableMoneys: (orderValue: OrderMoneyValue) => Promise<Money[]>

  /**
   * Atualiza no repositório valor atualizado de cédulas disponíveis
   * @throws PersistenceError
   */
  update: (moneys: Money[]) => Promise<void>
}

/**
 * Interface com funções para manipular um repositório de dados de cédulas de dinheiro, é a abstração que a camada
 * de domínio precisa conhecer, onde estas cédulas estão efetivamente persistidas não interessa para esta camada, pode
 * ser em um banco de dados relacional, não relacional, uma api externa, um sistema embarcado de persitência e comunicação
 * com a rede do banco no caixa eletrônico...
 */
