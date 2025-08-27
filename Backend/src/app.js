import express from "express"
import dotenv from "dotenv"
import router from "./services/routes/ai.routes.js"
import cors from "cors"
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.get("/", (req, res) => {
    res.send("hello user")
})

app.use("/ai", router)


export default app
