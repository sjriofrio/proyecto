//implemetame node mailer
import* as nodemailer from 'nodemailer';

//funcion principal de transporte
const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "steevenriofrio20@gmail.com",
      pass: "sewn ycqa tuyp wtkk",
    },
  });

export const sendEmail = (to, subject, html) => {
  const mailOptions = {
    from: 'tu_correo@gmail.com',
    to,
    subject,
    html, // Use the html property for the email body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });
};

 export const getEmailTemplate = (estado, nombre) => {
  switch (estado) {
    case 'pendiente':
      return {
        subject: 'Formulario pendiente',
        html: `
          <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; color: #333; background: linear-gradient(to bottom right, rgba(75, 202, 255, 0.5), rgba(255, 255, 255, 0.5)), url('https://i.imgur.com/k65qhRD.jpeg'); background-size: cover; background-position: center; background-repeat: no-repeat;">
            <div style="background-color: #ffffff; border: 8px solid #54a6b1; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); max-width: 600px; margin: auto; padding: 20px; border-radius: 8px; transition: box-shadow 0.3s ease;">
              <div style="text-align: center;">
                <img src="https://i.imgur.com/7dwBVWM.jpg" alt="Logo de la empresa" style="width: 110px; height: 110px; border-radius: 50%; display: block; margin: auto; object-fit: cover; box-shadow: 0 4px 8px rgba(61, 124, 161, 0.1); margin-bottom: 10px;">
              </div>
              <div style="background-color: #75c0c5; color: #ffffff; font-size: 16px; font-weight: bold; padding: 8px; text-align: center; margin-bottom: 8px;">
                Formulario Pendiente
              </div>
              <div style="padding: 10px; background-color: #f8f9fa; border-radius: 8px; margin-bottom: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-size: 14px;">
                <p style="margin-bottom: 8px; color: #555; text-align: justify;">Estimado/a ${nombre},</p>
                <p style="margin-bottom: 8px; color: #555; text-align: justify;">Tu formulario está pendiente de revisión.</p>
                <hr style="margin: 10px 0; border: none; border-top: 1px solid #ccc;">
                <p style="margin-bottom: 8px; color: #555; text-align: justify;">Atentamente,</p>
                <p style="margin-bottom: 8px; color: #555; text-align: justify;">El equipo de Land Manager S.A</p>
              </div>
              <div style="background-color: #eaf3f8; border-top: 1px solid #e7e2e2; padding: 8px; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; color: #a59f9f; font-size: 15px;">
                Para más detalles, por favor contacte con nuestro equipo de soporte técnico.
              </div>
              <div style="text-align: center; font-size: 12px; margin-top: 10px; color: #6d6b6b;">
                <p>Ha recibido este correo electrónico porque está registrado en nuestra lista de contactos de adquisición de terrenos o suscrito a nuestro boletín informativo.</p>
                <p>© 2024 Land Manager Empresa de Gestión de Adquisición de Terrenos | Todos los derechos reservados | <a href="#" style="color: #007bff; text-decoration: none;">Política de privacidad</a> | <a href="#" style="color: #007bff; text-decoration: none;">Darse de baja</a></p>
              </div>
            </div>
          </body>
        `,
      };
    case 'procesando':
      return {
        subject: 'Formulario en proceso',
        html: `
          <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; color: #333; background: linear-gradient(to bottom right, rgba(75, 202, 255, 0.5), rgba(255, 255, 255, 0.5)), url('https://i.imgur.com/k65qhRD.jpeg'); background-size: cover; background-position: center; background-repeat: no-repeat;">
            <div style="background-color: #ffffff; border: 8px solid #54a6b1; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); max-width: 600px; margin: auto; padding: 20px; border-radius: 8px; transition: box-shadow 0.3s ease;">
              <div style="text-align: center;">
                <img src="https://i.imgur.com/7dwBVWM.jpg" alt="Logo de la empresa" style="width: 110px; height: 110px; border-radius: 50%; display: block; margin: auto; object-fit: cover; box-shadow: 0 4px 8px rgba(61, 124, 161, 0.1); margin-bottom: 10px;">
              </div>
              <div style="background-color: #75c0c5; color: #ffffff; font-size: 16px; font-weight: bold; padding: 8px; text-align: center; margin-bottom: 8px;">
                Pago Aceptado <br>Compra de Terreno
              </div>
              <div style="padding: 10px; background-color: #f8f9fa; border-radius: 8px; margin-bottom: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-size: 14px;">
                <p style="margin-bottom: 8px; color: #555; text-align: justify;">Estimado/a ${nombre},</p>
                <p style="margin-bottom: 8px; color: #555; text-align: justify;">Nos complace informarle que su comprobante de pago ha sido recibido y aceptado. Su solicitud para la compra de un terreno está siendo procesada.</p>
                <p style="margin-bottom: 8px; color: #555; text-align: justify;">Por favor, manténgase atento a cualquier comunicación adicional de nuestro equipo mientras tramitamos su solicitud.</p>
                <hr style="margin: 10px 0; border: none; border-top: 1px solid #ccc;">
                <p style="margin-bottom: 8px; color: #555; text-align: justify;">Atentamente,</p>
                <p style="margin-bottom: 8px; color: #555; text-align: justify;">El equipo de Land Manager S.A</p>
              </div>
              <div style="background-color: #eaf3f8; border-top: 1px solid #e7e2e2; padding: 8px; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; color: #a59f9f; font-size: 15px;">
                Para más detalles, por favor contacte con nuestro equipo de soporte técnico.
              </div>
              <div style="text-align: center; font-size: 12px; margin-top: 10px; color: #6d6b6b;">
                <p>Ha recibido este correo electrónico porque está registrado en nuestra lista de contactos de adquisición de terrenos o suscrito a nuestro boletín informativo.</p>
                <p>© 2024 Land Manager Empresa de Gestión de Adquisición de Terrenos | Todos los derechos reservados | <a href="#" style="color: #007bff; text-decoration: none;">Política de privacidad</a> | <a href="#" style="color: #007bff; text-decoration: none;">Darse de baja</a></p>
              </div>
            </div>
          </body>
        `,
      };
    case 'completado':
      return {
        subject: 'Formulario completado',
        html: `
          <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; color: #333; background: linear-gradient(to bottom right, rgba(75, 202, 255, 0.5), rgba(255, 255, 255, 0.5)), url('https://i.imgur.com/k65qhRD.jpeg'); background-size: cover; background-position: center; background-repeat: no-repeat;">
            <div style="background-color: #ffffff; border: 8px solid #54a6b1; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); max-width: 600px; margin: auto; padding: 20px; border-radius: 8px; transition: box-shadow 0.3s ease;">
              <div style="text-align: center;">
                <img src="https://i.imgur.com/7dwBVWM.jpg" alt="Logo de la empresa" style="width: 110px; height: 110px; border-radius: 50%; display: block; margin: auto; object-fit: cover; box-shadow: 0 4px 8px rgba(61, 124, 161, 0.1); margin-bottom: 10px;">
              </div>
              <div style="background-color: #75c0c5; color: #ffffff; font-size: 16px; font-weight: bold; padding: 8px; text-align: center; margin-bottom: 8px;">
                Formulario Completado
              </div>
              <div style="padding: 10px; background-color: #f8f9fa; border-radius: 8px; margin-bottom: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-size: 14px;">
                <p style="margin-bottom: 8px; color: #555; text-align: justify;">Estimado/a ${nombre},</p>
                <p style="margin-bottom: 8px; color: #555; text-align: justify;">Tu formulario ha sido completado exitosamente.</p>
                <hr style="margin: 10px 0; border: none; border-top: 1px solid #ccc;">
                <p style="margin-bottom: 8px; color: #555; text-align: justify;">Atentamente,</p>
                <p style="margin-bottom: 8px; color: #555; text-align: justify;">El equipo de Land Manager S.A</p>
              </div>
              <div style="background-color: #eaf3f8; border-top: 1px solid #e7e2e2; padding: 8px; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; color: #a59f9f; font-size: 15px;">
                Para más detalles, por favor contacte con nuestro equipo de soporte técnico.
              </div>
              <div style="text-align: center; font-size: 12px; margin-top: 10px; color: #6d6b6b;">
                <p>Ha recibido este correo electrónico porque está registrado en nuestra lista de contactos de adquisición de terrenos o suscrito a nuestro boletín informativo.</p>
                <p>© 2024 Land Manager Empresa de Gestión de Adquisición de Terrenos | Todos los derechos reservados | <a href="#" style="color: #007bff; text-decoration: none;">Política de privacidad</a> | <a href="#" style="color: #007bff; text-decoration: none;">Darse de baja</a></p>
              </div>
            </div>
          </body>
        `,
      };
    default:
      return {
        subject: 'Estado del formulario',
        html: `
          <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; color: #333; background: linear-gradient(to bottom right, rgba(75, 202, 255, 0.5), rgba(255, 255, 255, 0.5)), url('https://i.imgur.com/k65qhRD.jpeg'); background-size: cover; background-position: center; background-repeat: no-repeat;">
            <div style="background-color: #ffffff; border: 8px solid #54a6b1; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); max-width: 600px; margin: auto; padding: 20px; border-radius: 8px; transition: box-shadow 0.3s ease;">
              <div style="text-align: center;">
                <img src="https://i.imgur.com/7dwBVWM.jpg" alt="Logo de la empresa" style="width: 110px; height: 110px; border-radius: 50%; display: block; margin: auto; object-fit: cover; box-shadow: 0 4px 8px rgba(61, 124, 161, 0.1); margin-bottom: 10px;">
              </div>
              <div style="background-color: #75c0c5; color: #ffffff; font-size: 16px; font-weight: bold; padding: 8px; text-align: center; margin-bottom: 8px;">
                Estado del Formulario
              </div>
              <div style="padding: 10px; background-color: #f8f9fa; border-radius: 8px; margin-bottom: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-size: 14px;">
                <p style="margin-bottom: 8px; color: #555; text-align: justify;">Estimado/a ${nombre},</p>
                <p style="margin-bottom: 8px; color: #555; text-align: justify;">El estado de tu formulario es: ${estado}.</p>
                <hr style="margin: 10px 0; border: none; border-top: 1px solid #ccc;">
                <a href="http://localhost:4200/property-card" style="display: block; text-align: center; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin: 10px 0;">Ver formulario</a>
                <p style="margin-bottom: 8px; color: #555; text-align: justify;">Atentamente,</p>
                <p style="margin-bottom: 8px; color: #555; text-align: justify;">El equipo de Land Manager S.A</p>
              </div>
              <div style="background-color: #eaf3f8; border-top: 1px solid #e7e2e2; padding: 8px; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; color: #a59f9f; font-size: 15px;">
                Para más detalles, por favor contacte con nuestro equipo de soporte técnico.
              </div>
              <div style="text-align: center; font-size: 12px; margin-top: 10px; color: #6d6b6b;">
                <p>Ha recibido este correo electrónico porque está registrado en nuestra lista de contactos de adquisición de terrenos o suscrito a nuestro boletín informativo.</p>
                <p>© 2024 Land Manager Empresa de Gestión de Adquisición de Terrenos | Todos los derechos reservados | <a href="#" style="color: #007bff; text-decoration: none;">Política de privacidad</a> | <a href="#" style="color: #007bff; text-decoration: none;">Darse de baja</a></p>
              </div>
            </div>
          </body>
        `,
      };
  }
};