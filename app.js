const express = require("express")
const app = express()
app.use(express.json())

app.get("/", (req, res) => res.send("Api działa"))


app.listen(5000, () => console.log("Serwer działa na porcie 5000"))