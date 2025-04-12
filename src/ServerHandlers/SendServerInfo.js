class SendServerInfo {
  constructor(app, db) {
    this.app = app
    this.db = db

    if (!this.db.servers_info) this.db.servers_info = []
  }

  handler() {
    this.app.post("/api/send_info", async (req, res) => {
      try {
        const data = req.body
        const chatId = String(data.telegramChatId)

        if (!chatId) {
          return res.code(400).send({ error: "Missing telegramChatId" })
        }

        const index = this.db.servers_info.findIndex(item => String(item.telegramChatId) === chatId)

        if (index !== -1) {
          this.db.servers_info[index] = {
            ...this.db.servers_info[index],
            ...data
          }

          return res.code(200).send({ status: "updated", chatId })
        } else {
          this.db.servers_info.push({ ...data, telegramChatId: chatId })
          return res.code(201).send({ status: "added", chatId })
        }
      } catch (e) {
        console.error("Ошибка в SendServerInfo:", e)
        return res.code(500).send({ error: "Internal Server Error" })
      } finally {
        console.log(`Текущее состояние БД после:`, this.db.servers_info)
      }
    })
  }
}

module.exports = { SendServerInfo }