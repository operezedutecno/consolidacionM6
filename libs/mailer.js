const nodemailer = require('nodemailer');
const { getMaxListeners } = require('process');

function enviar(to, subject, html) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bpcuenta1@gmail.com',
            pass: 'Cuenta1.2021'
        },
        tls:{ //Permite enviar correo sin necesidad de certificado SSL en el local...
            rejectUnauthorized: false
        }
    })

    let opciones = {
        from: 'link64cl@gmail.com',
        to,
        subject,
        html
    }

    transporter.sendMail(opciones, (err, data) => {
        if (err) console.log(err)
        if (data) console.log(data)
    })
}

module.exports = enviar