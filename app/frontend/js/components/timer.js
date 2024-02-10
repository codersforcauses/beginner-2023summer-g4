let currentTimerID;
let startTime;

let glowOutline = document.getElementById("glow-outline");
let timer = document.getElementById('round-timer')
let clock_icon = document.getElementById('clock-icon');
let clock_icon_dets = document.getElementById('clock-icon-dets');

function resetClock() {
    clock_icon.setAttribute("height", "16");
    clock_icon.setAttribute("width", "16");
    clock_icon_dets.setAttribute("fill", "black");
    timer.style = "";
}


function countdown(timeInSeconds) {

    if (timeInSeconds <= 10) {
        clock_icon.style.animation = "shake 0.2s ease-in-out infinite";
        clock_icon.setAttribute("height", "22");
        clock_icon.setAttribute("width", "22");
        clock_icon_dets.setAttribute("fill", "red");
        timer.style.color = "red";
        timer.style.fontSize = "2.5rem";
        timer.style.margin = "0 0";
        let formattedSeconds = String(timeInSeconds).padStart(2, '0');
        timer.innerHTML = `<strong>${formattedSeconds}</strong>`;
        return;
    }

    // Calculate minutes and seconds
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = timeInSeconds % 60;

    // Format minutes and seconds with leading zeros if needed
    let formattedMinutes = String(minutes).padStart(2, '0');
    let formattedSeconds = String(seconds).padStart(2, '0');


    timer.innerHTML = `<strong>${formattedMinutes}:${formattedSeconds}</strong>`;

}


function runTimer(time, submit_func) {
    startTime = Date.now();

    currentTimerID = setInterval(function () {

        if (time <= 10) {
            glowOutline.style.display = "block";
        }
        else {
            glowOutline.style.display = "none";
        }

        countdown(time);
        time--;

        if (time === -1){
            endTimer(currentTimerID);
            submit_func();
        }
    }, 1000);
}

function endTimer(timerID){
    clock_icon.style.animation = "";
    glowOutline.style.display = "none";
    clearInterval(timerID);
    const endTime = Date.now();
    const elapsedTimeInSeconds = (endTime - startTime)/1000;
    return elapsedTimeInSeconds;
}

export {runTimer, endTimer, resetClock, currentTimerID};
