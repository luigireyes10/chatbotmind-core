import fetch from 'node-fetch';


const TOKEN_WHATSAPP_NOTIFICATION =
  process.env.APP_WEB_TOKEN_WHATSAPP_NOTIFICATION
const PHONE_NUMBER_IDENTIFIER =
  process.env.APP_WED_PHONE_NUMBER_IDENTIFIER

type notificationTypes = 'template' | 'text' | 'interactive'

type Iprops = {
  message: string
  type?: string
  phoneNumber: number
}

type IBuildBody = {
  type: notificationTypes
  message: string
}

type IResulTypes = 'success' | 'error'

type IResult = {
  message: string
  type: notificationTypes
  resultType: IResulTypes
  data: any
  OK: boolean
}

const buildBody = ({ type, message }: IBuildBody) => {
  let data = {}

  if (type === 'template') {
    data = {
      name: 'notificacion',
      language: {
        code: 'es',
      },
      components: [
        {
          type: 'header',
          parameters: [
            {
              type: 'text',
              text: 'emedia',
            },
          ],
        },
        {
          type: 'body',
          parameters: [
            {
              type: 'text',
              text: 'Web',
            },
          ],
        },
      ],
    }
  }

  if (type === 'text') {
    data = {
      preview_url: true,
      body: message,
    }
  }

  if (type === 'interactive') {
    data = {
      type: 'button',
      body: { text: message },
      action: {
        buttons: [
          {
            type: 'reply',
            reply: {
              id: 'option-si',
              title: 'Si',
            },
          },
          {
            type: 'reply',
            reply: {
              id: 'option-no',
              title: 'No',
            },
          },
        ],
      },
    }
  }

  return data
}

const whatsAppMessage = async ({
  message,
  phoneNumber,
  type = 'text',
}: Iprops): Promise<IResult> => {
  const messaging_product = 'whatsapp';
  const to = `1${phoneNumber}`;

 // const dataSend: any[] = ['template', type];

 const dataSend: any[] = ['text', type];
  let resultWhatsApp = {};

  for await (const type of dataSend || []) {
    const newData = buildBody({ type, message });

    const data = {
      messaging_product,
      to,
      type,
      ...newData,
    };


    const data2 = {
      "messaging_product": "whatsapp",
      "to": to,
      "text": {
          "body": message
      },
      "type": "text"
  }

    const host = 'https://graph.facebook.com';
    const path = `v19.0/${PHONE_NUMBER_IDENTIFIER}/messages`;
    const url = `${host}/${path}`;

    const options = {
      method: 'POST',
      body: JSON.stringify(data2),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN_WHATSAPP_NOTIFICATION}`,
      },
    };

    console.log(JSON.stringify(options))
    console.log(options)

    try {
      const response: any = await fetch(url, options);
      const result = await response.json();
      const resultType = result?.error ? 'error' : 'success';

      const phoneNumber = result?.contacts?.length
        ? result.contacts[0]?.input
        : '';
      const dataError = result?.error;

      const phoneFormat = phoneNumber
        ?.toString()
        ?.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3-$4');

      const messageSuccess = `Notificación WhatsApp Enviada Con Éxito a. #Cell.: ${phoneFormat}`;
      const messageError = dataError?.error_data?.details;

      const message = resultType === 'error'
        ? `${phoneFormat} ${messageError}`
        : messageSuccess;

      if (type !== 'template') {
        console.log(message); // o cualquier otra acción con el mensaje
      }

      resultWhatsApp = {
        message,
        type,
        resultType,
        data: result,
        OK: resultType !== 'error',
      };
    } catch (err) {
      const data = err?.toString();

      const message = `Ocurrió un error al mandar la Notificación WhatsApp. ${data}`;
      const resultType = 'error';

      if (type !== 'template') {
        console.log(message); // o cualquier otra acción con el mensaje
      }

      resultWhatsApp = {
        message,
        type,
        resultType,
        data,
        OK: false,
      };
    }
  }

  return resultWhatsApp as IResult;
};

export { whatsAppMessage }
