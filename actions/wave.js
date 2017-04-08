/**
 * Simple app to wave your robot arm
 * and randomly change your LEDs at a given interval.
 * Uses raspi-soft-pwm library built with johnny-five
 */


var waveinterval = 1500;
var lightinterval = 500;

var mincycle = 1000;
var maxcycle = 2300;
var dutycycle = mincycle;

// Init board, setup software PWM on pin 26.
var Gpio = require('pigpio').Gpio;
var motor = new Gpio(7, {
    mode: Gpio.OUTPUT
});

/**
 * Set a timer that waves the robot arm every X seconds
 * Alternate across two positions - mincylce and maxcycle.
 */
function launchWave() {
    var interval = setInterval(function() {
        dutycycle = dutycycle == mincycle ? maxcycle : mincycle;
        motor.servoWrite(dutycycle);
        console.log(dutycycle);
    }, waveinterval);
    setTimeout(function() { clearInterval(interval); console.log('Stopping..'); }, 10000);
}

/**
 * Set a timer that waves the robot arm every X seconds
 * Set to max cylce each time but return to mincycle x seconds after
*/
launchWave();

process.on('SIGINT', function() {
    process.nextTick(function() {
        process.exit(0);
    });
});
