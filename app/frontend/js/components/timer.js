let currentTimerID;

function countdown(timeInSeconds) {
    var timer = document.getElementById('round-timer');

    // Calculate minutes and seconds
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = timeInSeconds % 60;

    // Format minutes and seconds with leading zeros if needed
    let formattedMinutes = String(minutes).padStart(2, '0');
    let formattedSeconds = String(seconds).padStart(2, '0');

    // Update the timer element
    timer.innerHTML = `<strong>${formattedMinutes}:${formattedSeconds}</strong>`;
}


function runTimer(time, submit_func) {

    currentTimerID = setInterval(function () {
        countdown(time);
        time--;
        if (time === -1){
            endTimer(currentTimerID);
            submit_func();
        }
    }, 1000);
}

function endTimer(timerID){
    clearInterval(timerID);
}

export {runTimer, endTimer, currentTimerID};
