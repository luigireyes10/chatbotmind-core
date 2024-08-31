const nodemailer = require("nodemailer");
require("dotenv/config");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SSL,
  auth: {
    user: `${process.env.USER_SYSTEM_EMAIL}`,
    pass: `${process.env.USER_SYSTEM_PASS}`,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function sendValidateEmail(email, id) {
  try {
    console.log(`Mensaje enviado a: ${email}`);
    var mailOptions = {
      from: `${process.env.USER_SYSTEM_EMAIL}`,
      to: `${email}`,
      subject: "¡Gracias por registrarte con nosotros!",
      html:
        "<p>Hemos recibido su solicitud, para activar una cuenta en el <strong>Sistema de Clientes de&nbsp;</strong><strong>Vegamovil</strong></p>\
            <p>Para completar la activación de su cuenta, favor hacer click en el siguiente enlace:&nbsp;</p>" +
        `${process.env.APP_URL}Validation?id=${id} \
            <p>En caso de no haber sido usted, favor desestimar esta información y notificarnos al número 809-242-8208. ¡Gracias por seleccionarnos como dealer de su preferencia!</p>`,
    };

    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(
          "Verifique la bandeja de su correo donde se le ha enviado las inidicaciones para validar la cuenta"
        );
      }
    });

    return "Verifique la bandeja de su correo donde se le ha enviado el enlace para activar la cuenta.";
  } catch (error) {
    console.log("Error al enviar el correo de validacion de la cuenta");
  }
}

export async function sendResetLink(email, id) {
  try {
    var mailOptions = {
      from: `${process.env.USER_SYSTEM_EMAIL}`,
      to: `${email}`,
      subject: "¡Gracias por contactarnos!",
      html:
        "<p>Hemos recibido una solicitud de recuperación de contraseña para su cuenta del Sistema de Clientes Vegamovil.</p>\
            <p>Para recuperar la contrase&ntilde;a, favor hacer click en el siguiente enlace:&nbsp;</p>" +
        `${process.env.APP_URL}ResetPassword?id=${id}\
            <p>Si no has solicitado un cambio de contraseña, Favor desestimar este correo electrónico. Puede que otro usuario haya introducido su correo por equivocación.</p>
            <p>Si siente que su cuenta pudiera ser objeto de fraude, no dude en contactarse con nosotros al 809-242-8208.
            ¡Gracias por seleccionarnos como dealer de su preferencia!</p>`,
    };

    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(
          "Verifique la bandeja de su correo donde se le ha enviado la contraseña"
        );
      }
    });

    return "Verifique la bandeja de su correo donde se le ha enviado el enlace para el cambio de la contraseña.";
  } catch (error) {
    return "error";
  }
}

export async function sendEmailToCLient(
  message: string,
  email: string,
  title: string
) {
  try {
    console.log(`Mensaje enviado a: ${email}`);
    var mailOp = {
      from: `${process.env.USER_SYSTEM_EMAIL}`,
      to: `${email}`,
      subject: `${title}`,
      html: message,
    };

    // send message
    await transporter.sendMail(mailOp, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("El correo fue enviado exitosamente.");
      }
    });
    return "El correo fue enviado exitosamente";
  } catch (error) {
    return "Error al enviar el correo";
  }
}

export async function sendNotificationEmail(
  message: string,
  email: string,
  notifType: string
) {
  let title: string = "";
  switch (notifType) {
    case "O":
      title = "Nuevas Ofertas - Vegamovil";
      break;

    case "V":
      title = "Nuevas Vehículos - Vegamovil";
      break;

    case "C":
      title = "Nuevos Precios en Vehículos - Vegamovil";
      break;
  }

  let mailOp = {
    from: `${process.env.USER_SYSTEM_EMAIL}`,
    to: `${email}`,
    subject: `${title}`,
    html: message,
  };

  return transporter.sendMail(mailOp);
}
