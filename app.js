const cors = require('cors')
const express = require('express');



const Gpio = require('onoff').Gpio;
const led = new Gpio(4, 'out');

const app = express()


app.use(cors())


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


// let stopBlinking = false;

// // Toggle the state of the LED connected to GPIO17 every 200ms
// const blinkLed = _ => {
//     if (stopBlinking) {
//         return led.unexport();
//     }

//     led.read((err, value) => { // Asynchronous read
//         if (err) {
//             throw err;
//         }

//         led.write(value ^ 1, err => { // Asynchronous write
//             if (err) {
//                 throw err;
//             }
//         });
//     });

//     setTimeout(blinkLed, 200);
// };

// blinkLed();X

// // Stop blinking the LED after 5 seconds
// setTimeout(_ => stopBlinking = true, 5000);


app.listen(80, function() {
    console.log('CORS-enabled web server listening on port 80')
})