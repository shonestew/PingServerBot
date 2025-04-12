class GetChatIdHandler {
  constructor(bot) {
    this.bot = bot
  }

  handler() {
    this.bot.command("get_chat_id", async (ctx) => {
      ctx.reply(`Айди чата: ${ctx.message.chat.id}`)
    })
  }
}

module.exports = { GetChatIdHandler }