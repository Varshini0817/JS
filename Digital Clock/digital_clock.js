let istTime;
let gradientStyleTag = null;
let currentMode = null; // 'video' or 'image'

// Fetch IST time
async function fetchISTTime() {
    try {
        const response = await fetch("https://timeapi.io/api/timezone/zone?timeZone=Asia%2FKolkata");
        const data = await response.json();
        istTime = new Date(data.currentLocalTime);
    } catch (error) {
        console.error("Failed to fetch IST time:", error);
        document.getElementById("digital_clock").textContent = "IST time not available.";
    }
}

// Update the clock every second
function updateClock() {
    if (!istTime) return;

    istTime.setSeconds(istTime.getSeconds() + 1);

    let hours = istTime.getHours();
    let minutes = istTime.getMinutes();
    let seconds = istTime.getSeconds();
    let am_pm = "AM";

    if (hours >= 12) {
        if (hours > 12) hours -= 12;
        am_pm = "PM";
    } else if (hours === 0) {
        hours = 12;
    }

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    const currTime = `${hours}:${minutes}:${seconds} ${am_pm}`;
    document.getElementById("digital_clock").textContent = currTime;
}

// Handle screen size: show image or video
function switchDisplayBasedOnWidth() {
    const loader = document.getElementById("loading");
    const video = document.getElementById("hourglass_video");
    const dC = document.getElementById("digital_clock");

    const isMobile = window.innerWidth <= 768;
    const newMode = isMobile ? "image" : "video";
    if (currentMode === newMode) return;

    currentMode = newMode;
    loader.style.display = "block";
    dC.style.display = "none";

    if (isMobile) {
        video.pause();
        video.style.display = "none";

        const bgImg = new Image();
        bgImg.src = "hourglass-2910948_1280.jpg";
        bgImg.onload = () => {
            document.body.style.background = `url(${bgImg.src}) center/cover no-repeat`;
            document.body.style.backgroundSize = "contain";

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
        document.body.style.background = "none";
        if (gradientStyleTag) {
            gradientStyleTag.remove();
            gradientStyleTag = null;
        }

        video.style.display = "none";
        video.src = "hour_glass.mp4";
        video.load();

        video.oncanplaythrough = () => {
            loader.style.display = "none";
            video.style.display = "block";
            dC.style.display = "block";
        };
    }
}

// Set up
window.addEventListener("load", () => {
    switchDisplayBasedOnWidth();
    fetchISTTime().then(() => {
        updateClock();
        setInterval(updateClock, 1000);
    });
});

window.addEventListener("resize", switchDisplayBasedOnWidth);
