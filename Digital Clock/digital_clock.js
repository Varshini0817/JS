function updateClock() {
    const time = new Date();

    // Get UTC time
    let utcHours = time.getUTCHours();
    let utcMinutes = time.getUTCMinutes();
    let utcSeconds = time.getUTCSeconds();

    // Add IST offset (+5:30)
    let istHours = utcHours + 5;
    let istMinutes = utcMinutes + 30;

    if (istMinutes >= 60) {
        istMinutes -= 60;
        istHours += 1;
    }

    if (istHours >= 24) {
        istHours -= 24;
    }

    let am_pm = "AM";
    if (istHours >= 12) {
        if (istHours > 12) istHours -= 12;
        am_pm = "PM";
    } else if (istHours === 0) {
        istHours = 12;
    }

    istHours = istHours < 10 ? "0" + istHours : istHours;
    istMinutes = istMinutes < 10 ? "0" + istMinutes : istMinutes;
    utcSeconds = utcSeconds < 10 ? "0" + utcSeconds : utcSeconds;

    const currTime = istHours + ":" + istMinutes + ":" + utcSeconds + " " + am_pm;
    const dC= document.getElementById("digital_clock");
    dC.textContent = currTime;

    window.addEventListener("load", () => {
        const video = document.getElementById("hourglass_video");
        document.getElementById("loading").style.display ="none";
        video.style.display = "block";
        video.src = "hour_glass.mp4";
        video.play();
        dC.style.display="block";
  });
}

setInterval(updateClock, 1000);
updateClock();
