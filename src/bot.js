const { StartCommand } = require("./BotHandlers/StartHandler.js");
const { PingCommand } = require("./BotHandlers/PingHandler.js");
const { AddServerHandler } = require("./BotHandlers/AddServerHandler.js");
const { GetChatIdHandler } = require("./BotHandlers/GetChatIdHandler.js");
const { Bot } = require("grammy");
require("dotenv").config();

const createBot = async (token, mdb) => {
    try {
        const bot = new Bot(token);
        const handlers = [ new StartCommand(bot), new PingCommand(bot, mdb), new AddServerHandler(mdb), new GetChatIdHandler(bot) ];
        handlers.forEach((command) => {
            command.handler();
        });
        return bot;
    } catch (e) {
        console.error(e);
    };
};

module.exports = { createBot };