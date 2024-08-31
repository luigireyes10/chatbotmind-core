const httpClient = require("urllib");

//Dinstar's VoIP Address
const url = "https://192.168.1.37/api/send_sms";

export async function sendSMS(text: string, number: string) {
  const options = {
    method: "POST",
    rejectUnauthorized: false,
    digestAuth: process.env.VOIP_DIGEST_AUTH,
    content: JSON.stringify({
      text: text.toString(),
      param: [{ number: number.toString() }],
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return httpClient.request(url, options);
}
