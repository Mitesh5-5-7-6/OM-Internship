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

    let convert = `${hours}:${minutes}:${seconds}`
    timerDetailsTime.textContent = convert
}

timerInput.addEventListener('input', () => {
    TimeValue = timerInput.value
    timeValue(TimeValue);
})

startButton.addEventListener('click', () => {

    if (TimeValue === '' || TimeValue === undefined) {
        timerDetailsTime.textContent = "Please enter a time";
    } else {

        convertSecond(TimeValue)

        if (totalSecond === 0) {
            timerDetailsTime.textContent = "Time Complete"
            clearInterval(setIntervalTime)
        } else if (totalSecond < 0) {
            timerDetailsTime.textContent = "Enter Wrong Time."
        } else {
            setIntervalTime = setInterval(() => {
                totalSecond -= 1
                convertTime(totalSecond)
            }, 1000)
            startButton.disabled = true;
        }

    }
})

pauseButton.addEventListener('click', () => {
    if (pauseButton.value === 'Pause') {
        clearInterval(setIntervalTime)
        pauseButton.value = 'Resume'

    } else {
        const resumeTime = timerDetailsTime.textContent

        convertSecond(resumeTime)

        setIntervalTime = setInterval(() => {
            totalSecond -= 1
            convertTime(totalSecond)
        }, 1000)

        pauseButton.value = 'Pause'
    }
})

resetButton.addEventListener('click', () => {
    TimeValue = ''
    clearInterval(setIntervalTime)
    timerDetailsTime.textContent = ''
    startButton.disabled = false;
})