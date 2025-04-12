const axios = require("axios")

class PingCommand {
  constructor(bot, db) {
    this.bot = bot
    this.db = db

    if (!this.db.servers_info) this.db.servers_info = []
    if (!this.db.ping_servers) this.db.ping_servers = []
  }

  handler() {
    this.bot.command("ping", async (ctx) => {
      try {
        const chatId = ctx.message.chat.id
        const chatIdStr = String(chatId)

        const chatServerInfo = this.db.servers_info.filter(item => String(item.telegramChatId) === chatIdStr)
        const chatServerStatusInfo = this.db.ping_servers.filter(item => String(item.chatId) === chatIdStr)

        if (chatServerInfo.length < 1) {
          ctx.reply("Вы не привязали сервер или бот пока не получил информацию об сервере.")
          return
        }

        if (chatServerStatusInfo.length < 1) {
          ctx.reply("Вы не добавили информацию об сервере!")
          return
        }

        const { ip, port } = chatServerStatusInfo[0]
        const res = await axios.get(`https://api.mcsrvstat.us/bedrock/3/${ip}:${port}`)

        if (!res.data.online) {
          ctx.reply(`Сервер отключён!\nАйпи и порт: ${ip}:${port}`)
          return
        }

        const serverData = chatServerInfo[0].data?.[0]

        if (!serverData) {
          ctx.reply("Нет данных о сервере. Подождите, пока они обновятся.")
          return
        }

        ctx.reply(
          `Сервер запущен!\n` +
          `ТПС: ${serverData.tps}\n` +
          `Игроки: ${Array.isArray(serverData.players) ? serverData.players.join(", ") : "Нет данных"} (${res.data.players.online}/${res.data.players.max})\n` +
          `Аптайм: ${serverData.time}\n` +
          `Дней в мире: ${serverData.day}\n` +
          `Последнее сообщение: ${serverData.message}`
        )
      } catch (e) {
        console.error("Ошибка класса PingCommand:", e)
        ctx.reply("Ошибка при попытке получить данные сервера.")
      }
    })
  }
}

module.exports = { PingCommand }