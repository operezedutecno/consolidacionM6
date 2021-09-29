const http = require('http')
const fs = require('fs')
const url = require('url')
const { peticiones } = require('./libs/functions')
const enviar  = require("./libs/mail")
//const { enviarDatos } = require("./assets/js/script")


http.createServer(async (req, res) => {
    let parametros = url.parse(req.url, true).query;

    if(req.url == "/"){
        res.writeHead(200,{'Content-type':'text/html'})
        fs.readFile('public/index.html','utf8',(err, content) =>{
            if(!err){
                res.end(content)
            }else{
                res.end("Ha ocurrido un error")
            }
        })
    }

    if(req.url == "/posts"){
        res.writeHead(200,{'Content-type':'application/json'})
        /*posts.then((datos) => {
            console.log(datos.data[0]);
        })*/
        let posts = await peticiones("https://jsonplaceholder.typicode.com/posts");
        let usuarios = await peticiones("https://jsonplaceholder.typicode.com/users");

        let retorno = posts.data.filter( (item) => item.id <= 20)
        retorno = retorno.map((item) => {
            let user = usuarios.data.find((row) => row.id == item.userId)
            item.user = user;
            return item;
        })
        res.end(JSON.stringify(retorno));
    }

    if(req.url.includes('/details')){
        res.writeHead(200,{'Content-type':'application/json'});
        let id=parametros.id;
        let detail = await peticiones(`https://jsonplaceholder.typicode.com/posts/${id}`)
        let retorno = detail.data;
        
        let usuarios = await peticiones("https://jsonplaceholder.typicode.com/users");
        let user = usuarios.data.find((row) => row.id == retorno.userId)
        retorno.user = user

        res.end(JSON.stringify(retorno));
    }

    if(req.url == "/script"){
        res.writeHead(200,{'Content-type':'text/javascript'})
        fs.readFile('assets/js/script.js','utf8', (err, content) => {
            res.end(!err ? content : "Ha ocurrido un error" );
        })
    }

    
    if (req.url.startsWith('/enviar')) {
        let { titulo, cuerpo, correo } = url.parse(req.url,true).query;
        res.setHeader('content-type','text/html');
        enviar(correo, titulo, cuerpo);
        res.end("se ha enviado");
    
    }

}).listen(8080, () => console.log("Ejecutando servidor http://localhost:8080"))