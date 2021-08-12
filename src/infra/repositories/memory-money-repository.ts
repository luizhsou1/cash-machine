import { Money, MoneyValue } from '../../domain/money'
import { IMoneyRespository, OrderMoneyValue } from '../../domain/interfaces/imoney-repository'

class MemoryMoneyRepository implements IMoneyRespository {
  private moneys: Money[]
  constructor () {
    // Valor Total inicial em notas: R$ 4.000,00
    this.moneys = [
      new Money(MoneyValue.ONE_HUNDRED, 10),
      new Money(MoneyValue.FIFTY, 20),
      new Money(MoneyValue.TWENTY, 50),
      new Money(MoneyValue.TEN, 100)
    ]
  }

  async getAvailableMoneys (orderValue: OrderMoneyValue): Promise<Money[]> {
    return await Promise.resolve(this.moneys
      .sort((a: Money, b: Money) => orderValue === 'ASC' ? (a.value - b.value) : (b.value - a.value)))
  }

  async update (moneys: Money[]): Promise<void> {
    // Simula o que um banco de dados faria, identificaria cada cédula e atualizaria a quantidade disponível
    for (const money of moneys) {
      const idx = this.moneys.findIndex((m) => m.value === money.value)
      this.moneys[idx] = money
    }
  }
}

// Obs1: Exporto um objeto e não a classe, pois quero que durante toda execução da aplicação trabalhe com o mesmo objeto de repositório, ou seja,
// um singleton, apesar de não ter implementado do jeito clássico, com uma função 'getInstance' que verifica se já existe um objeto 'instance', que
// nada mais é, que uma  referência estática de um objeto da própria classe, e quando invocada essa função, se não existir a 'instance', cria e retorna
// ela, e se existir, apenas retorna ela, garantindo sempre um único objeto daquela classe, só que no Node.js não precisamos de toda essa parafernalha,
// basta apenas exportar um objeto, e todos que importam esse módulo trabalharam com o mesmo objeto.
// Com isso, garanto que sempre estarei manipulando a mesma lista de cédulas de dinheiro, para simular a escassez, ou seja,
// ao longo da execução, pode acabar as notas.
// Obs2: Obviamente, pensando num cenário real, por exemplo, com um banco de dados, essa lista estaria sendo persisitida em algum disco,
// e ficaria a cargo do banco controlar as atualizações na tabela/collection que representa as cédulas de dinheiro.
export const memoryMoneyRepository = new MemoryMoneyRepository()

/**
 * Implementação em memória do repositório de cédulas de dinheiro
 */
