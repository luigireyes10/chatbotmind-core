 import  "reflect-metadata";
import { ConnectDBMongo } from "./dbmongo";
import { startDBConnection } from "./db";
import { startServer } from "./server";

// configuraciones para variables de entorno 
require('./config/config');

async function main() {
    //await ConnectDBMongo()
    await startDBConnection()
    await startServer()
}

main()

