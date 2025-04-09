const alarmInput = document.getElementById("alarm");
const setAlarmBtn = document.getElementById("setAlarm");
const cancelAlarmBtn = document.getElementById("cancelAlarm");
const alarmStatus = document.getElementById("alarmStatus");
const ringtoneSelect = document.getElementById("ringtoneSelect");

let alarmTimeout;

setAlarmBtn.addEventListener("click", () => {
    const alarmTime = alarmInput.value;
    if (!alarmTime) {
        alert("Please select a time.");
        return;
    }

    const now = new Date();
    const alarmDate = new Date(now.toDateString() + " " + alarmTime);

    if (alarmDate < now) {
        alarmDate.setDate(alarmDate.getDate() + 1);
    }

    const timeToAlarm = alarmDate.getTime() - now.getTime();
    console.log("timeToAlarm", timeToAlarm)
    alarmStatus.textContent = `Alarm set for ${alarmDate.toLocaleTimeString()}`;

    alarmTimeout = setTimeout(() => {
        const selectedId = ringtoneSelect.value;
        const selectedAudio = document.getElementById(selectedId);
        selectedAudio.play();
    }, 10000);
});

cancelAlarmBtn.addEventListener("click", () => {
    alarmInput.value = ''
    clearTimeout(alarmTimeout);
    alarmStatus.textContent = "Alarm cancelled.";

    const selectedId = ringtoneSelect.value;
    const selectedAudio = document.getElementById(selectedId);
    selectedAudio.pause();
});
