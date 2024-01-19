let currentTimerID;
let startTime;


function countdown(timeInSeconds) {
    const timers = document.getElementsByClassName('round-timer');

    // Calculate minutes and seconds
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = timeInSeconds % 60;

    // Format minutes and seconds with leading zeros if needed
    let formattedMinutes = String(minutes).padStart(2, '0');
    let formattedSeconds = String(seconds).padStart(2, '0');

    for (let timer of timers) {
        // Update the timer element
        timer.innerHTML = `<strong>${formattedMinutes}:${formattedSeconds}</strong>`;
    }

}


function runTimer(time, submit_func) {
    startTime = Date.now();

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
    const endTime = Date.now();
    const elapsedTimeInSeconds = (endTime - startTime)/1000;
    return elapsedTimeInSeconds;
}

export {runTimer, endTimer, currentTimerID};
