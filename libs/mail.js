const nodemailer = require('nodemailer');

function enviar(to,subject,text) {

    let transporter = nodemailer.createTransport(
        {
            service: 'gmail',
            auth:{
                user: 'prueba.node.back@gmail.com',
                pass: 'node123123'
            },
            tls:{ //Permite enviar correo sin necesidad de certificado SSL en el local...
                rejectUnauthorized: false
            }
        },
    )
    let mailOptions = {
        from: 'prueba.node.back@gmail.com',
        to: to,
        subject: subject,
        text: text,
    } 
    transporter.sendMail(mailOptions, (err,data) => {
        if (err) console.log(err);
        if (data) console.log(data);
    })
}
module.exports = enviar;