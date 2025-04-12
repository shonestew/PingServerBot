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
        if (chatServerInfo.length < 1) {
          ctx.reply("Вы не привязали сервер или бот пока не получил информацию об сервере.")
          console.log(`Сервер не привязан для chatId: ${chatId}`)
          return
        }

        if (chatServerStatusInfo.length < 1) {
          ctx.reply("Вы не добавили информацию об сервере!")
          console.log(`Информация о сервере не найдена для chatId: ${chatId}`)
          return
        }

        const { ip, port } = chatServerStatusInfo[0]
        console.log(`IP и порт сервера для chatId ${chatId}: ${ip}:${port}`)

        const res = await axios.get(`https://api.mcsrvstat.us/bedrock/3/${ip}:${port}`)

        if (!res.data.online) {
          ctx.reply(`Сервер отключён!\nАйпи и порт: ${ip}:${port}`)
          console.log(`Сервер на ${ip}:${port} не онлайн`)
          return
        }

        const serverData = chatServerInfo[0].data[0]

        ctx.reply(`Сервер запущен!\nТПС: ${serverData.tps}\nИгроки: ${serverData.players.join(", ")}(${res.data.players.online}/${res.data.players.max})\nАптайм: ${serverData.time}\nДней в мире: ${serverData.day}\nПоследнее сообщение: ${serverData.message}`)
      } catch (e) {
        console.error("Ошибка класса PingCommand:", e)
        ctx.reply("Ошибка при попытке получить данные сервера.")
      }
    })
  }
}

module.exports = { PingCommand }