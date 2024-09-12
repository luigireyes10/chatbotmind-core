import express from 'express'

import type { Request, Response } from 'express'
import { Server } from 'socket.io'
const { ExpressPeerServer } = require('peer')
const groupCallHandler = require('./groupCallHandler')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')
const PORT = process.env.APP_PORT //5000;
const { ConnectDB } = require('./db')
import { handleChatUser } from './module/userChat'
import User from './models/UserModel'
import Message from './models/MessageModel'
import { createToken } from './jwt'
import MessageRouter from './routes/message.routes'
import NotyifyRouter from './routes/notify.routes'
import UserRouter from './routes/user.routes'
import ContactRouter from './routes/contact.routes'
import { createServer } from 'http'
import ProspectoRouter from './routes/prospecto.routes'
import Prospecto from './models/prospectoModel'
import fs from 'fs'
import {
  GetmessageUser,
  ReceiveMessage,
} from '../httprest/controllers/whatsappcontrollers'
import { get } from 'request'
import path from 'path'
import { defaultQuery } from '../helpers/repositoryOperations'
import { getRepository, Repository } from 'typeorm'
import fetch from 'node-fetch';

let sampleText

export function sampleTextMessage(text: any) {
  return text
}
export function TextMessage(text: any) {
  sampleText = sampleTextMessage(text) // Almacena el texto en una variable global
  return text
}

export const ServerSokect = async (app: any, server: any): Promise<void> => {
  try {
    // function TextMessage(text: any) {

    //   sampleTextMessage(text)
    // return text;
    // }

    console.log('data', sampleText)

    //const app = express();

    //app.use(cors());

    ConnectDB()

    const io = new Server(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
      pingTimeout: 5000,
    })

    app.get('/', (req, res) => {
      res.send({ api: 'video-talker-api' })
    })

    app.get('/test', (req, res) => {
      res.send({ api: 'video-talker-api' })
    })
    app.set('io', io)

    // const server = app.listen(PORT, () => {
    //   console.log(`server is listening on port ${PORT}`);
    //   console.log(`http://localhost:${PORT}`);
    // });

    const peerServer = ExpressPeerServer(server, {
      debug: true,
    })

    app.use('/peerjs', peerServer)

    app.use('/api/messages', MessageRouter)

    app.use('/api/users', UserRouter)
    app.use('/api/notify', NotyifyRouter)
    app.use('/api/contacts', ContactRouter)
    app.use('/api/prospecto', ProspectoRouter)

    groupCallHandler.createPeerServerListeners(peerServer)

    let peers = []
    let groupCallRooms = []

    const broadcastEventTypes = {
      ACTIVE_USERS: 'ACTIVE_USERS',
      GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS',
    }

    io.on('connection', (socket) => {
      let user = null
      let userMessagesCache = {}
      socket.emit('connection', null)

      socket.on('new-message', async (message, callback) => {
          console.log('Received message:', message);
          console.log('Socket ID of sender is:', socket.id);
          // Procesa el mensaje aquí y responde si es necesario
          console.log('Emitiendo mensaje:', { status: 'OK', message });
      
          console.log('Receiver:', message);
      
          const url = 'https://unirmindbotspoc-qa.azurewebsites.net/api/SarchDocumentsTest';
          io.emit('message-received', { status: 'OK', message });
          console.log('Enviando respuesta al cliente...:', message);
      
          const data = {
              prompt: message
          };
          console.log('Enviando mensaje al servidor:', data);
      
          try {
              const response = await fetch(url, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(data)
              });
      
              const contentType = response.headers.get('content-type');
              if (contentType && contentType.includes('application/json')) {
                  const responseData = await response.json();
                  console.log('Respuesta del servidor:', responseData);
      
                  // Parsear nl_response si es una cadena JSON
                  let parsedNlResponse;
                  try {
                      parsedNlResponse = JSON.parse(responseData.nl_response.replace(/\\n/g, '\n'));
                  } catch (e) {
                      parsedNlResponse = responseData.nl_response;
                  }
                  
                  
      
                  io.emit('message-received-ia', { 
                    status: 'OK', 
                    nl_response: parsedNlResponse.nl_response || parsedNlResponse, 
                    user: '66411fc7f5a1513e647b28d3', 
                    semantic_results: parsedNlResponse.semantic_results || responseData.semantic_results 
                });
                
              } else {
                const textResponse = await response.text();
                console.error('Respuesta no es JSON:', textResponse);
                io.emit('message-received-ia', { 
                    nl_response: textResponse, 
                    user: '66411fc7f5a1513e647b28d3', 
                    semantic_results: null 
                });
                
              }
          } catch (error) {
              console.error('Error al enviar mensaje al servidor:', error);
              io.emit('message-received-ia', { 
                  status: 'ERROR', 
                  nl_response: error.message, 
                  user: '66411fc7f5a1513e647b28d3', 
                  semantic_results: null 
              });
          }
      
          // Llama al callback para confirmar la recepción del mensaje
          callback({ status: 'OK', message: 'Mensaje recibido correctamente' });
      });
      socket.on('newProspect', (data, callback) => {
        // Aquí puedes emitir el evento a todos los clientes conectados
        io.emit('prospectReceived', data)

        console.log('Enviando respuesta al cliente...:', data)
        callback('Respuesta del servidor a newProspect')
      })

  

      socket.on('getUsernamesWithMessages', async () => {
        try {
          const messages = await Message.find({ read: false })
          // Si el caché está vacío, buscar los mensajes en la base de datos
          if (Object.keys(userMessagesCache).length === 0) {
            const messages = await Message.find({})

            // Crear un objeto para contar los mensajes por usuario
            userMessagesCache = messages.reduce((counts, message) => {
              const userId = String(message.from)
              counts[userId] = (counts[userId] || 0) + 1
              return counts
            }, {})
          }

          // Buscar los usuarios en la base de datos
          const users = await User.find({
            _id: { $in: Object.keys(userMessagesCache) },
          })

          // Crear los datos de userInfos
          const userInfos = users.map((user) => ({
            _id: user._id,
            username: user.username,
            status: user.status,
            messageCount: userMessagesCache[String(user._id)],
          }))

          // Incrementar el messageCount del destinatario

          // Emitir el resultado al cliente
          console.log("Emitiendo 'usernamesWithMessages':", userInfos)
          io.emit('usernamesWithMessages', userInfos)
        } catch (error) {
          console.log(error)
          // Emitir un error al cliente
          socket.emit('error', { message: 'Internal server error' })
        }
      })

      // Cuando se recibe un nuevo mensaje, actualizar el caché

      // Cuando se recibe un nuevo mensaje, actualizar el caché
      socket.on('new-message-count', (message) => {
        const userId = String(message.from)
        userMessagesCache[userId] = (userMessagesCache[userId] || 0) + 1
      })

      socket.on('reset-message-count', (item) => {
        userMessagesCache[String(item._id)] = 0
        socket.emit('message-count-updated', { userId: item._id, count: 0 })
      })

      socket.on('markMessagesAsRead', async ({ userId, otherUserId }) => {
        try {
          // Marca los mensajes como leídos en la base de datos
          await Message.updateMany(
            { from: otherUserId, to: userId, read: false },
            { read: true }
          )

          // Envía una confirmación cliente
          socket.emit('messagesMarkedAsRead', {
            status: 'OK',
            message: 'Mensajes marcados como leídos correctamente',
          })
        } catch (error) {
          console.error('Failed to mark messages as read:', error)

          // Envía un error al cliente
          socket.emit('messagesMarkedAsRead', {
            status: 'Error',
            message: 'Falló al marcar los mensajes como leídos',
          })
        }
      })

      socket.on('register-new-user', async (data) => {
        // verify if the user is already registered on database

        user = JSON.parse(
          JSON.stringify(
            await User.findOne({
              username: data.username,
            })
          )
        )

        if (!user) {
          user = JSON.parse(
            JSON.stringify(
              await new User({
                username: data.username,
                status: 'online',
              }).save()
            )
          )
          console.log('Usuario Registrado en base de datos')
        } else {
          await User.findByIdAndUpdate(user._id, { status: 'online' })
          console.log('Usuario encontrado en la base de datos')
        }

        console.log('Usuario:', user)
        const token = createToken(user)
        console.log('Token:', token)

        socket.emit('user-registered', {
          user,
          token,
        })

        socket.on('get-user', () => {
          console.log('sending user')
          socket.emit('user-send', { user, token })
        })

        io.emit('user-connected', { ...user, status: 'online' })

        handleChatUser(socket, user._id, io)

        peers.push({
          /* username: data.username,
      _id: user._id, */
          ...user,
          socketId: data.socketId,
        })
        console.log('registered new user')
        console.log(peers)

        io.sockets.emit('broadcast', {
          event: broadcastEventTypes.ACTIVE_USERS,
          activeUsers: peers,
        })

        io.sockets.emit('broadcast', {
          event: broadcastEventTypes.GROUP_CALL_ROOMS,
          groupCallRooms,
        })

        socket.on('disconnect', async () => {
          console.log('user disconnected', user)
          socket.emit('user-disconnected', user)

          if (user) {
            const disconnectUser = await User.findByIdAndUpdate(
              user._id,
              { status: 'offline' },
              {
                new: true,
              }
            )
            io.emit('user-disconnected', { ...user, status: 'offline' })
          }
          console.log('user disconnected')
          peers = peers.filter((peer) => peer.socketId !== socket.id)
          io.sockets.emit('broadcast', {
            event: broadcastEventTypes.ACTIVE_USERS,
            activeUsers: peers,
          })

          groupCallRooms = groupCallRooms.filter(
            (room) => room.socketId !== socket.id
          )
          io.sockets.emit('broadcast', {
            event: broadcastEventTypes.GROUP_CALL_ROOMS,
            groupCallRooms,
          })
        })
      })

      /* 
  socket.on('disconnect', () => {
    console.log('user disconnected', user);

    if(user) {
      User.findByIdAndUpdate(user._id, {status: "offline"});
    }
    console.log('user disconnected');
    peers = peers.filter(peer => peer.socketId !== socket.id);
    io.sockets.emit('broadcast', {
      event: broadcastEventTypes.ACTIVE_USERS,
      activeUsers: peers
    });

    groupCallRooms = groupCallRooms.filter(room => room.socketId !== socket.id);
    io.sockets.emit('broadcast', {
      event: broadcastEventTypes.GROUP_CALL_ROOMS,
      groupCallRooms
    });
  }); */

      // listeners related with direct call

      socket.on('pre-offer', (data) => {
        console.log('pre-offer handled')
        io.to(data.callee.socketId).emit('pre-offer', {
          callerUsername: data.caller.username,
          callerSocketId: socket.id,
        })
      })

      socket.on('pre-offer-answer', (data) => {
        console.log('handling pre offer answer')
        io.to(data.callerSocketId).emit('pre-offer-answer', {
          answer: data.answer,
        })
      })

      socket.on('webRTC-offer', (data) => {
        console.log('handling webRTC offer')
        io.to(data.calleeSocketId).emit('webRTC-offer', {
          offer: data.offer,
        })
      })

      socket.on('webRTC-answer', (data) => {
        console.log('handling webRTC answer')
        io.to(data.callerSocketId).emit('webRTC-answer', {
          answer: data.answer,
        })
      })

      socket.on('webRTC-candidate', (data) => {
        console.log('handling ice candidate')
        io.to(data.connectedUserSocketId).emit('webRTC-candidate', {
          candidate: data.candidate,
        })
      })

      socket.on('user-hanged-up', (data) => {
        io.to(data.connectedUserSocketId).emit('user-hanged-up')
      })

      // listeners related with group call
      socket.on('group-call-register', (data) => {
        const roomId = uuidv4()
        socket.join(roomId)

        const newGroupCallRoom = {
          peerId: data.peerId,
          hostName: data.username,
          socketId: socket.id,
          roomId: roomId,
        }

        groupCallRooms.push(newGroupCallRoom)
        io.sockets.emit('broadcast', {
          event: broadcastEventTypes.GROUP_CALL_ROOMS,
          groupCallRooms,
        })
      })

      socket.on('group-call-join-request', (data) => {
        io.to(data.roomId).emit('group-call-join-request', {
          peerId: data.peerId,
          streamId: data.streamId,
        })

        socket.join(data.roomId)
      })

      socket.on('group-call-user-left', (data) => {
        socket.leave(data.roomId)

        io.to(data.roomId).emit('group-call-user-left', {
          streamId: data.streamId,
        })
      })

      socket.on('group-call-closed-by-host', (data) => {
        groupCallRooms = groupCallRooms.filter(
          (room) => room.peerId !== data.peerId
        )

        io.sockets.emit('broadcast', {
          event: broadcastEventTypes.GROUP_CALL_ROOMS,
          groupCallRooms,
        })
      })
    })
  } catch (error) {
    console.log(error)
  }
}
