require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")



const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB connected")
    app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
)
})
.catch(err => console.error(err))