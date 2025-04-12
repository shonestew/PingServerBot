const { SendServerInfo } = require("./ServerHandlers/SendServerInfo.js")
const { TestRequestHandler } = require("./ServerHandlers/TestRequestHandler.js")
const fastify = require("fastify")({ logger: true })

const createServer = async (db) => {
  try {
    const app = fastify
    const handlers = [
      new SendServerInfo(app, db),
      new TestRequestHandler(app)
    ]
    handlers.forEach((command) => {
      command.handler()
    })
    return app
  } catch (e) {
    console.error("Ошибка при создании сервера:", e)
  }
}

module.exports = { createServer }