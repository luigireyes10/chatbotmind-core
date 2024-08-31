import express from "express";
import morgan from "morgan";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";
import http from "http";
import https from "https";
import { json } from "body-parser";
import cookieParser from 'cookie-parser'
import { graphqlUploadExpress } from "graphql-upload";
import colors from "colors";
import {Server} from 'socket.io';
import { ApolloServer } from "apollo-server-express";
import { configurations } from "./config/config";
import { createSchema } from "./resolvers/createSchema";
import routes from "./http/routes";
import {ServerSokect} from './serverSokect/ServerSokect';
import cors from "cors";

//? server logs
const util = require("util");

const environment = process.env.NODE_ENV || "PROD";
const config = configurations[environment];

console.log({ config: config });

// const pathLogs = __dirname + "../../logs/";
// var log_file = fs.createWriteStream(pathLogs + "server-node.log", {
//   flags: "a",
//   start: 1,
// });
// var log_stdout = process.stdout;

// console.log = function (d) {
//   log_file.write(util.format(d) + "\n");
//   log_stdout.write(util.format(d) + "\n");
// };

/**
 * @description Servidor de Api Rest y Graphql
 */


export const startServer = async (): Promise<void> => {
    try {


     const app = express();

        
        app.use(morgan("common"));
        app.use(json())
        app.use(cookieParser())
        app.use(cors({ origin: '*' }))

        const schema = await createSchema()

        app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));


        // app.use(urlencoded({ extended: true, type: 'application/x-www-form-urlencoded', limit: '50mb' }))

        //? logs peticiones
        // var accessLogStream = rfs.createStream('access.log', {
        //     interval: '1d', // rotate daily
        //     path: path.join(__dirname, '../logs'),
        // })

        //? setup the logger
        // app.use(morgan("combined", { stream: accessLogStream }));
        const server = new ApolloServer({
            schema,
            context: ({ req }) => {
                const token = req.header('authorization') || '';

                console.log(token)
                if (token) {
                    try {
                        const user = jwt.verify(token, process.env.JWT_SECRET);
                        return {
                            user: user,
                        }
                    } catch (error) {
                        console.log(colors.red(error))
                    }
                }
            },
            uploads: false,
            playground: config.playground,
            introspection: config.introspection,
            // plugins: [
            //     ApolloServerPluginUsageReporting({
            //         generateClientInfo: ({
            //             request
            //         }
            //         ) => {
            //             const headers = request.http && request.http.headers;
            //             if(headers) {
            //                 return {
            //                     clientName: headers['apollographql-client-name'],
            //                     clientVersion: headers['apollographql-client-version'],
            //                 };
            //             } else {
            //                 return {
            //                     clientName: "Unknown Client",
            //                     clientVersion: "Unversioned",
            //                 };
            //             }
            //         },
            //     }),
            // ],
        })

        // capture error 
        // await server.start()

        // Static files
        app.use('/icons', express.static(path.join(process.cwd(), 'assets', 'icons')))
        // car image
        app.use('/images', express.static(path.join(process.cwd(), 'assets', 'Foto', 'VM')))
        // carfax
        app.use('/carfax', express.static(path.join(process.cwd(), 'assets', 'carfax')))
        // icons 
        app.use('/icons', express.static(path.join(process.cwd(), 'assets', 'icons')))
        // Static files
        app.use('/banners', express.static(path.join(process.cwd(), 'assets', 'banners')))
        // ofertas
        app.use('/ofertas', express.static(path.join(process.cwd(), 'assets', 'ofertas')))
        // logos marcas
        app.use('/logos', express.static(path.join(process.cwd(), 'assets', 'logos')))
        // documento carta banco 
        app.use('/cartas', express.static(path.join(process.cwd(), 'assets', 'docs')))
        // cotizacion seguros
        app.use('/seguros', express.static(path.join(process.cwd(), 'assets' , 'cotizacion_seguro')))
        
        app.use('/profile', express.static(path.join(process.cwd(), 'assets' , 'user')))
        // app.use(express.static(path.join(__dirname, "public")));

        // graphql route
        server.applyMiddleware({
            app,
            path: '/graphql',
            // cors: {
            //     credentials: true,
            //     origin: ['http://localhost:4001', 
            //     'https://studio.apollographql.com'
            // ], // 'http://localhost:3000'
            // }
        })

        app.use(routes)

        let httpServer;

        if (config.ssl) {
            // activate ssl
            let https_options = {
                key: fs.readFileSync('./ws.vegamovil.com.key'),
                cert: fs.readFileSync('./ws.vegamovil.com.crt'),
                ca: [
                    fs.readFileSync('./ws.vegamovil.com.ca-bundle')
                ]
            }
            // create https server
            httpServer = https.createServer(https_options, app)
        } else {
            // create https server
            httpServer = http.createServer(app);
        }
      
    // Listen in port
    httpServer.listen(process.env.APP_PORT);

    ServerSokect(app , httpServer);

    console.log(
      colors.yellow(
        `--> Server Started at: http${config.ssl ? "s" : ""}://${
          config.hostname
        }:${config.port}${server.graphqlPath}`
      )
    );
  } catch (error) {
    console.log(colors.red(error));
  }
};
