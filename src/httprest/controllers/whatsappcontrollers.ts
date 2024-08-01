import { Console } from "console";
import { Socket } from "socket.io";
import { title } from "process";
import { Request, Response } from 'express';
import { whatsAppMessage } from "../../helpers/Notification/WhatsApp";
import { sampleImage, sampleText } from "../../helpers/Notification/MessageTypeWhatsapp";
import { Router } from "express";
import Message from "../../serverSokect/models/MessageModel";

import { createMessage } from "../../serverSokect/controllers/message.controller";

 const sample = require("../../helpers/Notification/MessageTypeWhatsapp");


const VerifyToken = (req, res) => {

    //res.send('hola verify token')

    try {
        var accessToken = "EMEDIAHDFHDFHDFFDHD";
        var token = req.query["hub.verify_token"];
        var challenge = req.query["hub.challenge"];

        if (challenge != null && token != null && token == accessToken){
            res.send(challenge);
        }else {
            res.status(400).send();
        }

    } catch (e) {
        res.status(400).send();
    }

     
}

export const ReceiveMessage = async (req: Request, res: Response) => {

    const io = req.app.get('io');
    //console.log(req)

    try {
        
     
    // let entry = (req.body["entry"])[0];
    // let changes = (entry["changes"])[0];
    // let value = changes["value"];
    // let messageObject = value["messages"];

    const entry = req.body.entry[0];
    const changes = entry.changes[0];
    const value = changes.value;
    const messageObject = value.messages;
    
    if (typeof messageObject != "undefined"){
        let messages = messageObject[0];
        let number  = messages["from"];
        let type  = messages?.type;
        let fromm  = "66411fc7f5a1513e647b28d3";
        let tom = "66411fdef5a1513e647b28d8";
        let text  = GetmessageUser(messages);
        let message  = text;
        let data = sampleText("hola usuario", number);
        console.log(data);
        console.log(text)
        console.log(message);
        
        console.log(type);
  
        if (io) {
            console.log('Emitting message:', message);
            io.emit('message-received', { status: 'OK', message});
          } else {
            console.error('Socket.IO instance is not defined');
          }
      
        // Nueva ruta para obtener usuarios con mensajes
        try {
            let message_type;

            // Parse 'data' as an object and assign its properties to variables
            const { from, message, to, media } = JSON.parse(data);

            if (media) {
                message_type = 1; 
            } else if (message) {
                message_type = 2;
            }
        
            const newMessage = await new Message({
                from: fromm,
                to: tom,
                message: text,
                media,
                message_type: 2,
                read: false
            }).save();
        
            console.log(`Mensaje a guardar: ${text}`);
            console.log(`Remitente: ${fromm}`);
            console.log(`Destinatario: ${tom}`);
            console.log(`Media: ${JSON.stringify(media)}`); 
            console.log(`Tipo de mensaje: ${message_type}`); 

            
        
        } catch (error) {
            console.error(error);
        }
        
    


        if (type === "text") {
            data = sampleText("hola usuario", number);
            console.log(data);
        }

        else if (type === "image") {
            let data = sampleImage(number);
            console.log(data);
            // whatsAppMessage(data)
        }


        // const dataparam ={
        //     message: "el usuario dijo: " + text,
        //     phoneNumber: Number(number),
        //     type: 'text'
        // }

        // whatsAppMessage(dataparam)
    }
    res.send("EVENT_RECEIVED")
    }
    catch (error) {
        console.log(error)
        res.send("EVENT_RECEIVED")
    }
       
}




export function GetmessageUser(messages){
    let text = messages;
    let typeMessage = messages["type"];
    console.log(text);


    if(typeMessage == "text"){
        text = (messages["text"])["body"];

    }else if(typeMessage== "interactive"){ 

        let interactiveObject = messages["interactive"];
        let typeInteractive = interactiveObject["type"];

        if (typeInteractive == "buttom_reply"){
            text = (interactiveObject["buttom_reply"])["title"];
        }
         else if(typeInteractive == "list_reply"){
            text = (interactiveObject["list_reply"])["title"];

        }else{
            console.log("sin mensajes");
        }

     }else{
        console.log("sin mensajes");
     }
     return text;

}

module.exports = {
    VerifyToken,
    ReceiveMessage,
    GetmessageUser
}