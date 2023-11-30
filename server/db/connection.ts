import { Sequelize } from "sequelize"
import { DATABASE_URI } from "../utils/config"

const sequelize = new Sequelize(DATABASE_URI, { logging: false })

void (async () => sequelize.sync({ force: true }))()

export default sequelize
