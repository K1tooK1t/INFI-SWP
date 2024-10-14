function startWatch() {
    const clockElement = document.getElementById('time');
    timer = setInterval(() => {
        clockElement.textContent = new Date().toLocaleTimeString();
    }, 1000);
}

function stopWatch() {
    clearInterval(timer);
}