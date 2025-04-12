const { serverInfoSchema } = require("../Schemas/serverInfoSchema.js");

class SendServerInfo {
    constructor(app, mdb) {
        this.app = app;
        this.mdb = mdb;
    };

    handler() {
        this.app.post("/api/send_info", { schema: serverInfoSchema }, async (req, res) => {
            try {
                const chatId = req.body.telegramChatId;
                const chatServerInfo = this.mdb.collection("servers_info").find({ chatId }).toArray();

                if (chatServerInfo.length < 1) {
                    await this.mdb.updateOne({ chatId }, { $set: req.body });
                    return;
                } else {
                    await this.mdb.insertOne(req.body);
                    return;
                };

                return res.send(201);
            } catch (e) {
                console.error("Ошибка класса SendServerInfo: ", e);
                return res.send(500);
            };
        });
    };
};

module.exports = { SendServerInfo };