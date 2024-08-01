
const messagetypeText = {
    "object": "whatsapp_business_account",
    "entry": [
      {
        "id": "106393322156626",
        "changes": [
          {
            "value": {
              "messaging_product": "whatsapp",
              "metadata": {
                "display_phoneNumber": null,
                "phone_number_Id": "101935022611761"
              },
              "contacts": [
                {
                  "profile": {
                    "name": "User Name"
                  },
                  "wa_id": "51123456789"
                }
              ],
              "messages": [
                {
                  "from": "51123456789",
                  "id": "wamid.HBgLNTE5NDM2NjI5NjQVAgASGBQzQUNCODUzN0U1QkU5MkZENTFBQwA=",
                  "Timestamp": "1660362642",
                  "type": "text",
                  "text": {
                    "body": "hola ..."
                  },
                  "interactive": null,
                  "image": null,
                  "audio": null,
                  "video": null,
                  "document": null,
                  "sticker": null,
                  "location": null,
                  "contacts": null,
                  "system": null
                }
              ],
              "errors": null,
              "statuses": null
            },
            "field": "messages"
          }
        ]
      }
    ]
  }



  export function sampleText(textResponse , number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "text": {
            "body": textResponse
        },
        "type": "text"
    });
    return data;
  }

  export function sampleImage(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "image",
        "image": {
            "link": "https://i.pinimg.com/736x/55/97/a9/5597a9e2ad98912f550e2719cd673d6b.jpg"
        },
      
    });
    return data;
  }

  export function sampleAudio(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "audio",
        "audio": {
            "link": "https://i.pinimg.com/736x/55/97/a9/5597a9e2ad98912f550e2719cd673d6b.jpg"
        },
      
    });
    return data;
  }

  export function sampleVideo(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "video",
        "video": {
            "link": "https://i.pinimg.com/736x/55/97/a9/5597a9e2ad98912f550e2719cd673d6b.jpg"
        },
      
    });
    return data;
  }

  
  export function sampleDocumento(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "document",
        "document": {
            "link": "https://i.pinimg.com/736x/55/97/a9/5597a9e2ad98912f550e2719cd673d6b.jpg"
        },
      
    });
    return data;
  }

  export function SampleButtons(number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "body": {
                "text": "¿Confirmas tu registro?"
            },
            "action": {
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "001",
                            "title": "Sí"
                        }
                    },
                    {
                        "type": "reply",
                        "reply": {
                            "id": "002",
                            "title": "No"
                        }
                    }
                ]
            }
        }
    });
    return data;
}

export function SampleList(number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "list",
            "body": {
                "text": "Tengo estas opciones"
            },
            "footer": {
                "text": "Selecciona una de las opciones para poder atenderte"
            },
            "action": {
                "button": "Ver opciones",
                "sections": [
                    {
                        "title": "Compra y vende productos",
                        "rows": [
                            {
                                "id": "main-comprar",
                                "title": "Comprar",
                                "description": "Compra los mejores productos para ti"
                            },
                            {
                                "id": "main-vender",
                                "title": "Vender",
                                "description": "Vende tus productos"
                            }
                        ]
                    },
                    {
                        "title": "Centro de atención",
                        "rows": [
                            {
                                "id": "main-agencia",
                                "title": "Agencia",
                                "description": "Puedes visitar nuestra agencia."
                            },
                            {
                                "id": "main-contacto",
                                "title": "Centro de contacto",
                                "description": "Te atenderá uno de nuestro agentes."
                            }
                        ]
                    }
                ]
            }
        }
    });
    return data;
}

 export function SampleLocation(number){
    const data = JSON.stringify({
      "messaging_product": "whatsapp",
      "to": number,
      "type": "location",
      "location": {
        "latitude": "-12.067158381865067",
        "longitude": "-77.033779048393486",
        "name": "Estadio Nacional del Perú",
        "address": "C. José Díaz s/n, Cercado de Lima 15046"
      }
    });
    return data;
  }

