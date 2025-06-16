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
    const loader = document.getElementById("loading");
    const video = document.getElementById("hourglass_video");
    const dC = document.getElementById("digital_clock");

    if (window.innerWidth <= 768) {
        // Create a dummy image to preload the background
        dC.style.display = "none";
        const bgImg = new Image();
        bgImg.src = "hourglass-2910948_1280.jpg";
        bgImg.onload = () => {
            loader.style.display = "none";
            dC.style.display = "block";
        };
    } else {
        // Desktop behavior: wait for video to be ready
        video.src = "hour_glass.mp4";
        video.oncanplaythrough = () => {
            loader.style.display = "none";
            video.style.display = "block";
            dC.style.display = "block";
        };
    }
});

}

setInterval(updateClock, 1000);
updateClock();
