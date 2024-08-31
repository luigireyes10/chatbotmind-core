import  "reflect-metadata";
import { startDBConnection } from "./db";
import { startServer } from "./server";

// configuraciones para variables de entorno 
require('./config/config');

async function main() {
    await startDBConnection()
    await startServer()
}

main()
