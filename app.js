const cors = require('cors')
const express = require('express');

const { exec } = require("child_process");


const Gpio = require('onoff').Gpio;
const led = new Gpio(4, 'out');

const app = express()


app.use(cors())
app.use(express.static('public'))



app.get('/led/:value', function(req, res, next) {
    let statusLed = parseInt(req.params.value)

    led.write(statusLed);

    led.read((err, value) => { // Asynchronous read
        if (err) {
            throw err;
        }

        res.status(200).send({
            value: statusLed,
            typeof: typeof statusLed,
            status: statusLed ? true : false,
            statusNow: value
        });
    })
});

app.listen(3000, function() {
    console.log('CORS-enabled web server listening on port 80')

    exec("chromium-browser --start-fullscreen --app=http://192.168.15.114:3000")
})