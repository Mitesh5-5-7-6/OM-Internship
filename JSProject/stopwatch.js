const stopwatchStartButton = document.getElementById("startStopwatch");
const stopwatchPauseButton = document.getElementById("pauseStopwatch");
const stopwatchLapButton = document.getElementById("lapsStopwatch");
const stopwatchResetButton = document.getElementById("resetStopwatch");

let stopwatchDetailsTime = document.querySelector(".js-stopwatch-details__time");
let stopwatchDetailsTable = document.querySelector(".js-stopwatch-details__table");

let splitTime = document.querySelector(".js-split-time");
let totalTime = document.querySelector(".js-total-time");

let totalSeconds = 0;
let prevLapSeconds = 0;
let lapNo = 0
let setIntervalStopwatchTime;

// function convertSecond(timeValue) {
//     const hours = timeValue.split(":")[0];
//     const minutes = timeValue.split(":")[1];
//     const seconds = timeValue.split(":")[2];

//     totalSeconds = (hours * 3600) + (minutes * 60) + (seconds * 1)
// }

function convertTime(totalSecond) {

    const hours = parseInt(totalSecond / 3600)
    const minutes = parseInt((totalSecond % 3600) / 60)
    const seconds = parseInt((totalSecond % 3600) % 60)

    return `${hours}:${minutes}:${seconds}`
}

stopwatchStartButton.addEventListener('click', () => {
    setIntervalStopwatchTime = setInterval(() => {
        totalSeconds += 1
        stopwatchDetailsTime.textContent = convertTime(totalSeconds);
    }, 1000)
    stopwatchStartButton.disabled = true
})

stopwatchPauseButton.addEventListener('click', () => {
    if (stopwatchPauseButton.value === 'Pause') {
        clearInterval(setIntervalStopwatchTime)
        stopwatchLapButton.disabled = true
        stopwatchPauseButton.value = 'Resume'
    } else {
        // convertSecond(stopwatchDetailsTime.textContent)
        setIntervalStopwatchTime = setInterval(() => {
            totalSeconds += 1
            stopwatchDetailsTime.textContent = convertTime(totalSeconds);
        }, 1000)

        stopwatchLapButton.disabled = false
        stopwatchPauseButton.value = 'Pause'
    }
})


stopwatchLapButton.addEventListener('click', () => {

    lapNo = lapNo + 1;
    let splitTime = convertTime(totalSeconds - prevLapSeconds)
    let totalTime = convertTime(totalSeconds)
    prevLapSeconds = totalSeconds

    if (!document.querySelector('.js-table-body')) {
        stopwatchDetailsTable.innerHTML = `
            <table style="width: 50%;">
                <thead>
                    <tr>
                        <th style="text-align: start; border-bottom: 2px solid rgb(74, 72, 72);">Lap No.</th>
                        <th style="text-align: center; border-bottom: 2px solid rgb(74, 72, 72);">Split</th>
                        <th style="text-align: end; border-bottom: 2px solid rgb(74, 72, 72);">Total</th>
                    </tr>
                </thead>
                <tbody class="js-table-body"></tbody>
            </table>`;
    }

    const tableBody = document.querySelector('.js-table-body');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td style="text-align: start; border-bottom: 1px solid rgb(74, 72, 72);">Lap ${lapNo}</td>
        <td class="js-split-time" style="text-align: center; border-bottom: 1px solid rgb(74, 72, 72);">${splitTime}</td>
        <td class="js-total-time" style="text-align: end; border-bottom: 1px solid rgb(74, 72, 72);">${totalTime}</td>
    `;
    tableBody.prepend(row);
})

stopwatchResetButton.addEventListener('click', () => {
    clearInterval(setIntervalStopwatchTime);
    totalSeconds = 0;
    prevLapSeconds = 0;
    lapNo = 0;
    stopwatchDetailsTime.textContent = '00:00:00';
    stopwatchDetailsTable.innerHTML = '';
    stopwatchStartButton.disabled = false;
    stopwatchPauseButton.value = 'Pause';
    stopwatchLapButton.disabled = false;
});