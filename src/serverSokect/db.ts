import { connect } from "mongoose"

export const ConnectDB = async () => {
    try {
        await connect(process.env.DB_MONGO_URL)
        console.log('DB connected')
    } catch (error) {
        console.log(error)
    }
}