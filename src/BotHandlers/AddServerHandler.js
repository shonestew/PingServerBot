class AddServerHandler {
    constructor(bot, mdb) {
        this.bot = bot;
        this.mdb = mdb;
    };

    handler() {
        this.bot.command("addserver", async (ctx) => {
            try {
                const chatId = ctx.message.chat.id;
                const mess = ctx.message.text.toLowerCase();
                const arg = mess.trim().split(" ");

                const chatServerStatusInfo = this.mdb.collection("ping_servers").find({ chatId }).toArray();

                if (chatServerStatusInfo.length < 1) {
                    ctx.reply("Вы уже добавили информацию об сервере!");
                    return;
                };

                await mdb.collection("ping_servers").insertOne({ chatId: chatId, ip: arg[1], port: arg[2] });
                ctx.reply("Сервер добавлен!");
            } catch (e) {
                console.error("Ошибка класса AddServerHandler: ", e);
            };
        });
    };
};

module.exports = { AddServerHandler };