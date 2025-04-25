const timerInput = document.getElementById("timer");

const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");

let timerDetailsTime = document.querySelector(".js-timer-details__time");

let TimeValue = '00:00:00';
let totalSecond = 0;
let setIntervalTime;

function timeValue(timeValue) {
    const hours = timeValue.split(":")[0];
    const minutes = timeValue.split(":")[1];
    const seconds = timeValue.split(":")[2];

    timerDetailsTime.textContent = `${hours}:${minutes}:${seconds}`;
}

function convertSecond(timeValue) {
    const hours = timeValue.split(":")[0];
    const minutes = timeValue.split(":")[1];
    const seconds = timeValue.split(":")[2];

    totalSecond = (hours * 3600) + (minutes * 60) + (seconds * 1)
}

function convertTime(totalSecond) {

    const hours = parseInt(totalSecond / 3600)
    const minutes = parseInt((totalSecond % 3600) / 60)
    const seconds = parseInt((totalSecond % 3600) % 60)

    return convert = `${hours}:${minutes}:${seconds}`
}

timerInput.addEventListener('input', () => {
    TimeValue = timerInput.value
    // timeValue(TimeValue);
    convertSecond(TimeValue);
    timerDetailsTime.textContent = convertTime(totalSecond);
})

startButton.addEventListener('click', () => {
    if (!TimeValue || totalSecond <= 0) {
        timerDetailsTime.textContent = "Please enter a valid time";
        return;
    }

    // if (setIntervalTime) clearInterval(setIntervalTime);

    setIntervalTime = setInterval(() => {
        if (totalSecond <= 0) {
            clearInterval(setIntervalTime);
            timerDetailsTime.textContent = "Time's up!";
            return;
        }

        totalSecond -= 1;
        timerDetailsTime.textContent = convertTime(totalSecond);
    }, 1000);
    startButton.disabled = true
});

pauseButton.addEventListener('click', () => {
    if (pauseButton.value === 'Pause') {
        clearInterval(setIntervalTime)
        pauseButton.value = 'Resume'

    } else {
        setIntervalTime = setInterval(() => {

            if (totalSecond <= 0) {
                clearInterval(setIntervalTime);
                timerDetailsTime.textContent = "Time's up!";
                return;
            }

            totalSecond -= 1;
            timerDetailsTime.textContent = convertTime(totalSecond);
        }, 1000);

        pauseButton.value = 'Pause';
    }
})

resetButton.addEventListener('click', () => {
    TimeValue = ''
    clearInterval(setIntervalTime)
    timerDetailsTime.textContent = ''
    startButton.disabled = false;
})