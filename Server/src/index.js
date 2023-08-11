const app = require("./app");
const { database } = require("./db")
const PORT = 3001;

app.listen(PORT, async () => {
  await database.sync({ force: true })
  console.log("Server raised in port: ", PORT);
});