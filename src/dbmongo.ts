import { connect } from "mongoose"

export const ConnectDBMongo = async () => {
    try {
        await connect(process.env.DB_MONGO_URL)
        console.log('DB mongo connected')
    } catch (error) {
        console.log(error)
    }
}