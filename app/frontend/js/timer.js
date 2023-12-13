function countdown(time) {
    var timer = document.getElementById('round-timer');
    timer.innerHTML = 'Timer: ' + time;
}

function updateAndDecrement(){
    countdown(time);
    time--;
}

function runTimer(time) {

    let timerID = setInterval(function () {
        countdown(time);
        time--; 

    }, 1000);

    return timerID;
}

function endTimer(timerID){
    clearInterval(timerID);
}

function checkIfTimerHasEnded() {

}

let currentTimerID = runTimer(180);

export {runTimer, endTimer, currentTimerID};
