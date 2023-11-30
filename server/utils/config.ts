import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT
const DATABASE_URI = process.env.DATABASE_URI ? process.env.DATABASE_URI : ""

export { PORT, DATABASE_URI }
