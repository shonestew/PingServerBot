class TestRequestHandler {
  constructor(app) {
    this.app = app
  }

  handler() {
    this.app.get("/", async (req, res) => {
      res.send(200)
    })
  }
}

module.exports = { TestRequestHandler }