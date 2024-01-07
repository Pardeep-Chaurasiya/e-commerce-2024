import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"

import { connectDB } from "./config/db.config"
import userRoute from "./routes/user.route"
import { errorMiddleware } from "./middleware/error";

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/v1/user",userRoute)


app.use(errorMiddleware)

const PORT = process.env.PORT
console.log(PORT)
// connectDB()
app.listen(PORT,()=>{
    console.log(`Server started on http://localhost:${PORT}`)
})


