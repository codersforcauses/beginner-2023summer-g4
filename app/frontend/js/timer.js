import {submit} from './game.js';

let currentTimerID;

function countdown(time) {
    var timer = document.getElementById('round-timer');
    timer.innerHTML = `<strong>${time}</strong>`
}

function runTimer(time) {

    currentTimerID = setInterval(function () {
        countdown(time);
        time--;
        if (time === -1){
            endTimer(currentTimerID);
            submit();
        }
    }, 1000);
}

function endTimer(timerID){
    clearInterval(timerID);
}


runTimer(10);

export {runTimer, endTimer, currentTimerID};
