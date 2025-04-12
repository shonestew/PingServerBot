const { StartCommand } = require("./BotHandlers/StartHandler.js")
const { PingCommand } = require("./BotHandlers/PingHandler.js")
const { AddServerHandler } = require("./BotHandlers/AddServerHandler.js")
const { GetChatIdHandler } = require("./BotHandlers/GetChatIdHandler.js")
const { Bot } = require("grammy")
require("dotenv").config()

const createBot = async (token, db) => {
  try {
    const bot = new Bot(token)
    const handlers = [
      new StartCommand(bot),
      new PingCommand(bot, db),
      new AddServerHandler(bot, db),
      new GetChatIdHandler(bot)
    ]
    handlers.forEach((command) => {
      command.handler()
    })
    return bot
  } catch (e) {
    console.error("Ошибка при создании бота:", e)
  }
}

module.exports = { createBot }