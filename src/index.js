const { createServer } = require("./server.js")
const { createBot } = require("./bot.js")

const main = async () => {
  try {
    const fakeDB = {} //i dont like mongo

    const bot = await createBot(env.token, fakeDB)
    const server = await createServer(fakeDB)

    let port = env.port || 3000

    while (true) {
      try {
        await server.listen({
          port: env.port,
          host: host
        })
        console.log(`Сервер запущен на порту ${port}!`)
        break
      } catch (err) {
        if (err.code === 'EADDRINUSE') {
          console.warn(`Порт ${port} занят, пробуем следующий...`)
          port++
        } else {
          throw err
        }
      }
    }

    await bot.start()
    console.log("Бот запущен!")
  } catch (e) {
    console.error("Ошибка при запуске:", e)
  }
}

main()

process.on('SIGINT', () => {
  console.log('Завершение работы (SIGINT)')
  process.exit(0)
})

process.on('SIGTERM', () => {
  console.log('Завершение работы (SIGTERM)')
  process.exit(0)
})

process.on('exit', (code) => {
  console.log(`Процесс завершён с кодом: ${code}`)
})