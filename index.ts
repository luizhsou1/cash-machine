import { initAnswer } from './src/ui/console/answer'
import { initServer } from './src/ui/web/app'
import { initConsole } from './src/ui/console/console'

const mode = process.env.EXECUTION_MODE ?? 'answer'
switch (mode) {
  case 'answer':
    initAnswer()
    break
  case 'console':
    initConsole()
    break
  case 'web':
    initServer()
    break
  default:
    console.log(`Não foi possível executar o programa no modo '${mode}'.`)
    process.exit(1)
}
