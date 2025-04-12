const axios = require("axios");

class PingCommand {
    constructor(bot, mdb) {
        this.bot = bot;
        this.mdb = mdb;
    };

    handler() {
        this.bot.command("ping", async (ctx) => {
            try {
                const chatId = ctx.message.chat.id;
                const chatServerInfo = this.mdb.collection("servers_info").find({ chatId }).toArray();
                const chatServerStatusInfo = this.mdb.collection("ping_servers").find({ chatId }).toArray();

                if (chatServerInfo.length < 1) {
                    ctx.reply("Вы не привязали сервер или же бот пока не получил информацию об сервере");
                    return;
                };

                if (chatServerStatusInfo.length < 1) {
                    ctx.reply("Вы не добавили информацию об сервере!");
                    return;
                };

                const res = await axios.get(`https://api.mcsrvstat.us/bedrock/3/${chatServerStatusInfo[0].ip}:${chatServerStatusInfo[0].port}`);

                if (!res.data.online) {
                    ctx.reply(`Сервер отключён!\nАйпи и порт: ${chatServerStatusInfo[0].ip}:${chatServerStatusInfo[0].port}`);
                    return;
                };

                ctx.reply(`Сервер запущен!\nТПС сервера: ${chatServerInfo[0].tps},\nСписок игроков: ${chatServerInfo[0].player_list.join(", ")} (${chatServerStatus.data.players.online}/${res.data.players.max}),\nАптайм сервера: ${chatServerInfo[0].server_time}\nСколько дней миру на сервере: ${chatServerInfo[0].total_days} дней,\nПоследнее сообщение в чате: ${chatServerInfo[0].last_message}`);
            } catch (e) {
                console.error("Ошибка класса PingCommand: ", e);
            };
        });
    };
};

module.exports = { PingCommand };