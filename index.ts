import { initServer } from './src/ui/web/app'
// import { initConsole } from './src/ui/console/console'

// const idx = process.argv.findIndex((a) => a === '--mode')
// if (idx < 0) {
//   console.log('Informe um \'--mode\' no comando. (ex: --mode console)')
//   process.exit(1)
// }

// const mode = process.argv[idx + 1]
// switch (mode) {
//   case 'console':
//     initConsole()
//     break
//   case 'web':
//     initServer()
//     break
//   default:
//     console.log(`Não foi possível executar o programa para o mode='${mode}'`)
//     process.exit(1)
// }

initServer()
