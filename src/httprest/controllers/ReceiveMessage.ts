import {
  sampleImage,
  sampleText,
} from '../../helpers/Notification/MessageTypeWhatsapp'
import { createMessage } from '../../serverSokect/controllers/message.controller'
import { GetmessageUser } from './whatsappcontrollers'

const ReceiveMessage = (req, res) => {
  //console.log(req)

  try {
    // let entry = (req.body["entry"])[0];
    // let changes = (entry["changes"])[0];
    // let value = changes["value"];
    // let messageObject = value["messages"];
    const entry = req.body.entry[0]
    const changes = entry.changes[0]
    const value = changes.value
    const messageObject = value.messages

    if (typeof messageObject != 'undefined') {
      let messages = messageObject[0]
      let number = messages['from']
      let type = messages?.type
      let from = '66411fdef5a1513e647b28d8'
      let to = '664ea820e9ff17f2ae3de9a2'
      let text = GetmessageUser(messages)

      console.log(text)
      console.log(type)

      // Nueva ruta para obtener usuarios con mensajes
      if (type === 'text') {
        let data = sampleText('hola usuario', number)
        console.log(data)
        createMessage({ from: from, to: to, message: text }, res)
      } else if (type === 'image') {
        let data = sampleImage(number)
        console.log(data)
        // whatsAppMessage(data)
      }

      // const dataparam ={
      //     message: "el usuario dijo: " + text,
      //     phoneNumber: Number(number),
      //     type: 'text'
      // }
      // whatsAppMessage(dataparam)
    }
    res.send('EVENT_RECEIVED')
  } catch (error) {
    console.log(error)
    res.send('EVENT_RECEIVED')
  }
}
