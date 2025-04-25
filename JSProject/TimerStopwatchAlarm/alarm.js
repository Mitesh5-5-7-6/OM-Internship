const alarmInput = document.getElementById("alarm");
const setAlarmBtn = document.getElementById("setAlarm");
const cancelAlarmBtn = document.getElementById("cancelAlarm");
const alarmStatus = document.getElementById("alarmStatus");
const ringtoneSelect = document.getElementById("ringtoneSelect");

let alarmTimeout;

setAlarmBtn.addEventListener("click", () => {
    const alarmTime = alarmInput.value;
    if (!alarmTime) {
        alarmStatus.textContent = "Please select a time."
        return;
    }

    const now = new Date();
    const alarmDate = new Date(now.toDateString() + " " + alarmTime);

    console.log(now)
    console.log(now.getTime())

    console.log(alarmDate)
    console.log(alarmDate.getTime())

    const timeToAlarm = alarmDate.getTime() - now.getTime();

    alarmStatus.textContent = `Alarm set for ${alarmDate.toLocaleTimeString()}`;

    const selectedId = ringtoneSelect.value;
    const selectedAudio = document.getElementById(selectedId);
    alarmTimeout = setTimeout(() => {
        selectedAudio.play();

        alarmTimeout = setTimeout(() => {
            selectedAudio.pause();
            clearTimeout(alarmTimeout);
            alarmStatus.textContent = "Alarm completed.";
        }, 5000);

    }, timeToAlarm);

});

cancelAlarmBtn.addEventListener("click", () => {
    alarmInput.value = ''
    clearTimeout(alarmTimeout);
    alarmStatus.textContent = "Alarm cancelled.";

    const selectedId = ringtoneSelect.value;
    const selectedAudio = document.getElementById(selectedId);
    selectedAudio.pause();
});
