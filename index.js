const http = require('http')
const fs = require('fs')
const url = require('url')
const { peticiones } = require('./libs/functions')
const enviar = require('./libs/mailer')

http.createServer(async(req, res) => {
    var retorno
    async function obtenerPost(idPost) {
        res.writeHead(200, { 'Content-type': 'application/json' });
        let detail = await peticiones(`https://jsonplaceholder.typicode.com/posts/${idPost}`)
        retorno = detail.data;
        return retorno
    }

    async function obtenerUsuario() {
        let retorno2
        let usu = await peticiones("https://jsonplaceholder.typicode.com/users");
        retorno2 = usu.data
        return retorno2
    }

    let parametros = url.parse(req.url, true).query;

    if (req.url == "/") {
        res.writeHead(200, { 'Content-type': 'text/html' })
        fs.readFile('public/index.html', 'utf8', (err, content) => {
            if (!err) {
                res.end(content)
            } else {
                res.end("Ha ocurrido un error")
            }
        })
    }

    if (req.url == "/posts") {
        res.writeHead(200, { 'Content-type': 'application/json' })
            /*posts.then((datos) => {
                console.log(datos.data[0]);
            })*/
        let posts = await peticiones("https://jsonplaceholder.typicode.com/posts");
        let usuarios = await peticiones("https://jsonplaceholder.typicode.com/users");

        let retorno = posts.data.filter((item) => item.id <= 20)
        retorno = retorno.map((item) => {
            let user = usuarios.data.find((row) => row.id == item.userId)
            item.user = user;
            return item;
        })
        res.end(JSON.stringify(retorno));
    }

    if (req.url.includes('/details')) {
        Promise.all([obtenerPost(parametros.id), obtenerUsuario()]).then((data) => {
            let detalle = data[1].find((row) => row.id == data[0].userId)
            let variable = data[0]
            variable.user = detalle
            res.end(JSON.stringify(variable))
        })
    }

    if (req.url.includes('/mail')) {
        res.writeHead(200, { 'Content-type': 'application/json' });
        let id = parametros.id;
        let detail = await peticiones(`https://jsonplaceholder.typicode.com/posts/${id}`)
        let retorno = detail.data;

        let usuarios = await peticiones("https://jsonplaceholder.typicode.com/users");
        let user = usuarios.data.find((row) => row.id == retorno.userId)
        retorno.user = user

        res.end(JSON.stringify(retorno));
    }

    if (req.url.includes('/send-mail')) {
        let parametros = url.parse(req.url, true).query
            // console.log(parametros)
        enviar(parametros.correo.split(','), parametros.asunto, parametros.contenido);
        res.end('Correo enviado con éxito');
    }

    if (req.url == "/script") {
        res.writeHead(200, { 'Content-type': 'text/javascript' })
        fs.readFile('assets/js/script.js', 'utf8', (err, content) => {
            res.end(!err ? content : "Ha ocurrido un error");
        })
    }

}).listen(8080, () => console.log("Ejecutando servidor http://localhost:8080"))