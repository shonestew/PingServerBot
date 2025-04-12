class StartCommand {
  constructor(bot) {
    this.bot = bot
  }

  handler() {
    this.bot.command("start", async (ctx) => {
      ctx.reply("Ну, это команда /start и всё.")
    })
  }
}

module.exports = { StartCommand }