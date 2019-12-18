const express = require('express');
const app = express();

const hbs = require('hbs');
require('./hbs/helpers');

const port = process.env.PORT || 3000;

//############################################################################333

const axios = require('axios');

const ubicacion = require('./controlador/ubicacion');
const clima = require('./controlador/clima');

var getInfo = async(ciudad) => {
    try {
        const coords = await ubicacion.getCiudadLatLon(ciudad);
        const temp = await clima.getClima(coords.lat, coords.lng);
        return `El clima de ${ coords.direccion } es de ${ temp }.`;
    } catch (e) {
        return `No se pudo determinar el clima de ${ ciudad }`;
    }
}

//############################################################################333

app.use(express.static(__dirname + '/public'));

// Express HBS engine
hbs.registerPartials(__dirname + '/views/parciales');
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
    const grQui = getInfo("quito");
    const grGua = getInfo("guayaquil")
    res.render('home', {
        gradosQui:  grQui,
        gradosGua: grGua
    });
});


app.get('/about', (req, res) => {
    const grMad = getInfo("madrid");
    const grPar = getInfo("paris")
    res.render('about', {
        gradosMad: grMad,
        gradosPar: grPar
    });
});

app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${port}`);
});




