<h1 align="center"> Simulador de Caixa Eletrônico </h1>

Simula um caixa eletrônico, efetuando a entrega de notas para o cliente, sendo as condições de aceite:
- Entregar o menor número de notas;
- É possível sacar o valor solicitado com as notas disponíveis;
- Saldo do cliente infinito;
- Quantidade de notas finita;
- Notas disponíveis de `R$ 100,00`; `R$ 50,00`; `R$ 20,00` e `R$ 10,00`

Exemplos:

- **Valor do Saque:** `R$ 30,00` – **Resultado Esperado:** Entregar 1 nota de `R$20,00` e 1 nota de `R$ 10,00`.  
- **Valor do Saque:** `R$ 80,00` – **Resultado Esperado:** Entregar 1 nota de `R$50,00` 1 nota de `R$ 20,00` e 1 nota de R$ `10,00`.  

---

## 🔥 Instalação e execução

**Faça clone do repositório:**

```sh
git clone https://github.com/luizhsou1/cash-machine.git
```

**Entre na pasta `cash-machine`:**

```sh
cd cash-machine
```

**Crie o arquivo de variáveis de ambiente:**

```sh
cp .env.sample .env
```

**Instale a versão do projeto (Recomendado):**

```sh
nvm install
nvm use
```

**Faça a instalação das dependências do projeto:**

```sh
npm install
```

**Construa o projeto:**

```sh
npm run build
```

**Rode o projeto:**

```sh
npm start
```

> Obs: A variável de ambiente `EXECUTION_MODE` determina o modo de execução que a aplicação deve usar, sendo eles:
> - `answer`: Deixa a cargo do usuário definir em qual modo deseja executar (console ou web).
> - `console`: Executa a aplicação direto no modo console.
> - `web`: Executa a aplicação direto no modo web.

---

## 🏛 Arquitetura

```
src
│   ├── domain => Camada de domínio da aplicação
│   │   ├── errors => Diretório contendo arquivos com classes que estendem a classe Error
│   │   │   ├── persistence-error.ts => Classe que representa erros ocorridos ao persistir dados 
│   │   │   └── validation-error.ts => Classe que representa erros de validação
│   │   ├── interfaces => Diretório contendo as abstrações que a camada de domínio precisa conhecer
│   │   │   └── imoney-repository.ts => Interface com funções para manipular um repositório de dados de notas
│   │   ├── cash-machine.ts => Classe que representa o caixa eletrônico no sistema
│   │   └── money.ts => Classe que representa as cédulas de dinheiro no sistema
│   ├── infra => Camada d infraestrutura da aplicação
│   │   └── repositories => Diretório contendo arquivos com implementações de repositórios de dados
│   │       └── memory-money-repository.ts => Implementação do ImoneyRepository em memória
│   ├── shared => Diretório contendo arquivos/funções que podem ser compartilhado entre as camadas
│   │   ├── constants.ts => Arquivo com constantes da aplicação
│   │   └── validations-util.ts => Arquivo com funções úteis de validação
│   └── ui => Camada que interage com usuário
│       ├── console => Diretório contendo arquivos para interação via console
│       │   ├── answer.ts => Fluxo de interação via console, perguntando sobre qual modo de execução usuário deseja usar
│       │   ├── console.ts => Fluxo de interação via cosole, executando efetivamente o sistema
│       │   └── console-util.ts => Arquivo com funções úteis para interação via console
│       └── web => Diretório contendo arquivos para interação via web
│           ├── app.ts => Arquivo contendo configurações e função para executar a aplicação web
│           ├── error-handling.ts => Arquivo contendo middleware de tratativa de erros da aplicação web
│           ├── routes.ts => Arquivo contendo configurações de rota do sistema, com seus respectivos middlewares
│           └── swagger.ts => Arquivo de configuração do swagger da aplicação web
test
│   ├── integrations => Diretório contendo arquivos de testes de integração
│   └── units => Diretório contendo arquivos de testes unitários
```

---

## ⚡ Algoritmo de retiradas de notas

Explicação macro do algoritmo de retirada de notas, contido no arquivo `src/domain/cash-machine`, na função `withdraw`:

1. Valida entrada;
2. Busca notas disponíveis no repositório em ordem decrescente;
3. Executa uma função recursiva que retorna uma lista contendo objetos da classe Money, com o máximo de notas que conseguiu tentando satisfazer o pedido, com a devida ordem de prioridade, tentando sempre retornar a menor quantidade de notas possível;
4. Soma a (quantidade * valor) de cada nota obtida na etapa anterior;
5. Se soma for diferente do valor requirido, lança execeção, se for igual, segue o fluxo;
6. Percorre a lista de objetos da classe Money, para pegar o índice correspondente na lista de notas disponíveis, obtendo esse índice chama a função remove do objeto, passando a quantidade a ser removida;
7. Atualiza a lista de notas disponíveis, depois de ter removido a quantidade devida;
8. Retorna o resultado obtido.

Explicação macro do algoritmo de retirada de notas **recursivo**, contido no arquivo `src/domain/cash-machine`, na função `recursiveWithdraw`, basicamente em cada interação da recursão:

1. Verifica a condição de parada, sendo ela, se não tem mais valor a ser retirado ou se não tem mais notas disponíveis para retirar;
2. Calcula a quantidade ideal de notas daquele tipo que está sendo iterado no momento;
3. Pega o menor valor entre a quantidade ideal e quantidade disponível do que está sendo iterado no momento;  
  3.1 Exemplo 1: se a quantidade ideal é 10, e a quantidade disponível é 5, obtenho 5 daquela nota;  
  3.2 Exemplo 2: se a quantidade ideal é 5, e a quantidade disponível é 10, obtenho 5 também daquela nota;
4. Calcula o valor efetivo que aquela interação pode contribuir;
5. Se aquela iteração contribuir com alguma quantidade, retorna uma lista contendo um objeto Money e o resultado da chamada das proximas iterações recursivas. Se não contribuir, apenas chama a função recursiva novamente. Onde para cada chamada recursiva passo no primeiro argumento o (valor daquela interação - o valor efetivo que a iteração contribuiu) e no segundo argumento o restante da lista de notas disponíveis.

---

## 🤖 Comandos

- `build`: Gera os arquivos javascript da aplicação e coloca na pasta `dist`.
- `start`: Executar a aplicação obtida do build.
- `dev`: Executa a aplicação em modo de desenvolvimento, monitorando mudanças no código.
- `lint`: Valida estilo do código.
- `lint:fix`: Valida e corrige estilo do código.
- `test`: Executa testes unitários.
- `test:integration`: Executa testes de integração.
- `test:watch`: Executa testes unitários e monitora mudanças no código.
- `test:coverage`: Executa testes unitários e apresenta um relatório de cobertura na saída do terminal e arquivo `coverage/lcov-report/index.html`.

> A corbertura de código foi configurada para monitorar apenas a camada de domínio, que é onde efetivamente escrevi os testes unitários.
