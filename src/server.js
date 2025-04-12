const { SendServerInfo } = require("./ServerHandlers/SendServerInfo.js");
const { TestRequestHandler } = require("./ServerHandlers/TestRequestHandler.js");
const fastify = require("fastify")({ logger: true });

const createServer = async (mdb) => {
    try {
        const app = fastify;
        const handlers = [ new SendServerInfo(app, mdb), new TestRequestHandler(app) ];
        handlers.forEach((command) => {
            command.handler();
        });
        return app;
    } catch (e) {
        console.error(e);
    };
};

module.exports = { createServer };