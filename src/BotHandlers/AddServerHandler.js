class AddServerHandler {
  constructor(bot, db) {
    this.bot = bot;
    this.db = db;
  }

  handler() {
    this.bot.command("addserver", async (ctx) => {
      try {
        const chatId = ctx.message.chat.id;
        const mess = ctx.message.text.toLowerCase();
        const arg = mess.trim().split(" ");

        if (arg.length < 3) {
          await ctx.reply("Формат: /addserver <ip> <port>");
          return;
        }

        this.db.ping_servers = this.db.ping_servers || [];

        const alreadyExists = this.db.ping_servers.some((entry) => entry.chatId === chatId);

        if (alreadyExists) {
          await ctx.reply("Вы уже добавили информацию об сервере!");
          return;
        }

        this.db.ping_servers.push({
          chatId,
          ip: arg[1],
          port: arg[2]
        });
        this.db.servers_info = this.db.servers_info || [];
        await ctx.reply("Сервер добавлен!");
      } catch (e) {
        console.error("Ошибка класса AddServerHandler:", e);
        await ctx.reply("Произошла ошибка при добавлении сервера.");
      }
    });
  }
}

module.exports = { AddServerHandler };