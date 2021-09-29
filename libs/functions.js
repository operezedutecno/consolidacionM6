const { default: axios } = require("axios")

let peticiones = (url) => {
    return new Promise((resolve, reject) => {
        axios.get(url).then((datos)=>{
            resolve(datos);
        }).catch((e) => {
            reject("Ha ocurrido un error")
        })
    })
}

module.exports = { peticiones }