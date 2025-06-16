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

 let gradientStyleTag = null;
let currentMode = null; // 'video' or 'image'

function switchDisplayBasedOnWidth() {
    const loader = document.getElementById("loading");
    const video = document.getElementById("hourglass_video");
    const dC = document.getElementById("digital_clock");

    // Prevent redundant processing
    const isMobile = window.innerWidth <= 768;
    const newMode = isMobile ? "image" : "video";
    if (currentMode === newMode) return;

    currentMode = newMode;
    loader.style.display = "block";
    dC.style.display = "none";

    if (isMobile) {
        // Switch to image background
        video.pause();
        video.style.display = "none";

        const bgImg = new Image();
        bgImg.src = "hourglass-2910948_1280.jpg";

        bgImg.onload = () => {
            document.body.style.background = `url(${bgImg.src}) center/cover no-repeat`;
            document.body.style.backgroundSize = "contain";

            // Add overlay gradient
            if (!gradientStyleTag) {
                gradientStyleTag = document.createElement("style");
                gradientStyleTag.innerHTML = `
                    body::before {
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: linear-gradient(100.2deg, rgba(255, 255, 255, 0), rgba(250, 159, 114, 0.711));
                        z-index: 0;
                    }
                `;
                document.head.appendChild(gradientStyleTag);
            }

            loader.style.display = "none";
            dC.style.display = "block";
        };
    } else {
        // Switch to video background
        document.body.style.background = "none";
        if (gradientStyleTag) {
            gradientStyleTag.remove();
            gradientStyleTag = null;
        }

        // Reset video src and show
        video.style.display = "none";
        video.src = "hour_glass.mp4"; // force reload
        video.load(); // ensure it prepares to play

        video.oncanplaythrough = () => {
            loader.style.display = "none";
            video.style.display = "block";
            dC.style.display = "block";
        };
    }
}

// Initial load and dynamic resizing
window.addEventListener("load", switchDisplayBasedOnWidth);
window.addEventListener("resize", switchDisplayBasedOnWidth);



}

setInterval(updateClock, 1000);
updateClock();
