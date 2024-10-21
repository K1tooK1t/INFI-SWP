function startWatch() {
    const clockElement = document.getElementById('time');
    timer = setInterval(() => {
        clockElement.textContent = new Date().toLocaleTimeString();
    }, 1000);
}

function stopWatch() {
    clearInterval(timer);
}

function resetWatch() {
    clearInterval(timer);
    elapsedTime = 0;
    document.getElementById("time").innerText = "00:00:00";
}