const serverInfoSchema = {
    body: {
        type: "object",
        required: ["telegramChatId", "tps", "player_list", "server_time", "total_days", "last_message"],
        properties: {
            telegramChatId: { type: "number" },
            tps: { type: "number", minimum: 0 },
            player_list: { type: "array", items: { type: "string" }, minItems: 1 },
            server_time: { type: "number" },
            total_days: { type: "number" },
            last_message: { type: "string" },
        },
    },
};

module.exports = { serverInfoSchema };