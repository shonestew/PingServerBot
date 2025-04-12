const { createServer } = require("./server.js");
const { createBot } = require("./bot.js");
require("dotenv").config();
if (!process.env.DB) {
    throw new Error('Переменная DB не определена в .env');
}
console.log(`Используемая база данных: ${process.env.DB}`);
const { MongoClient } = require("mongodb");

const mdb = new MongoClient(process.env.MONGO_URL);

const main = async () => {
    try {
        await mdb.connect();
        const db = mdb.db(process.env.DB);
        const bot = await createBot(process.env.TOKEN, db);
        const server = await createServer(db);

        const port = Number(process.env.PORT) || 3000;
        try {
            await server.listen({ port: port });
            console.log(`Сервер запущен на порту ${port}!`);

            await bot.start();
            console.log("Бот запущен!");
        } catch (e) {
            console.error(e);
            mdb.close();
        };
    } catch (e) {
        console.error(e);
    };
};

main();

process.on('SIGINT', () => {
    console.log('Программа завершена через SIGINT');
    mdb.close();
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('Программа завершена через SIGTERM');
    mdb.close();
    process.exit(0);
});

process.on('exit', (code) => {
    console.log(`Процесс завершён с кодом: ${code}`);
    mdb.close();
});