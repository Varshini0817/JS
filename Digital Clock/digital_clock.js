let istTime;
let gradientStyleTag = null; //background effect
let currentMode = null; // 'video' or 'image'
// IST time using API
// area and location Asia/Kolkata Continent/Location IANA
async function fetchISTTime() {
    try {
        const response = await fetch("https://timeapi.io/api/timezone/zone?timeZone=Asia%2FKolkata");
        const data = await response.json();
        console.log(response);
        istTime = new Date(data.currentLocalTime); //changing to date format
    } catch (error) {
        console.error("Failed to fetch IST time:", error);
        document.getElementById("digital_clock").textContent = "IST time not available.";
    }
}

// Update for every second (1000ms)
function updateClock() {
    if (!istTime) return;

    istTime.setSeconds(istTime.getSeconds() + 1);

    let hours = istTime.getHours();
    let minutes = istTime.getMinutes();
    let seconds = istTime.getSeconds();
    let am_pm = "AM";

    if (hours >= 12) {
        if (hours > 12) hours -= 12; //from 13 hrs
        am_pm = "PM"; //if >= 12 setting to PM
    } else if (hours === 0) { //24 hour format
        hours = 12;
    }

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    const currTime = `${hours}:${minutes}:${seconds}${am_pm}`;
    document.getElementById("digital_clock").textContent = currTime;
}

// Displaying image or video accordingly
function switchDisplayBasedOnWidth() {
    const loader = document.getElementById("loading");
    const video = document.getElementById("hourglass_video");
    const dC = document.getElementById("digital_clock");

    const isMobile = window.innerWidth <= 768;
    const newMode = isMobile ? "image" : "video";
    if (currentMode === newMode) return; //if after resizing and before resizing is same -> no action

    currentMode = newMode;
    loader.style.display = "block"; //Show loading initially
    dC.style.display = "none";// don't display even time

    //Mobile screen-> image
    //stop video
    if (isMobile) {
        video.pause();
        video.style.display = "none"; //remove video

        const bgImg = new Image();
        bgImg.src = "hourglass-2910948_1280.jpg";
        //Lazy loading image
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
            //  dynamic css     
                // <head>
                //   ...<style>
                //     body::before {
                //       ...
                //     }
                //   </style>
                // </head>
            }

            loader.style.display = "none"; //removing loader 
            dC.style.display = "block"; //showing time
        };
    } else {
        document.body.style.background = "none"; //removing background effect for larger screens(video)
        if (gradientStyleTag) {
            gradientStyleTag.remove();
            gradientStyleTag = null;
        }

        video.style.display = "none";
        video.src = "hour_glass.mp4";
        video.load();
        //Lazy loading video
        video.oncanplaythrough = () => {
            loader.style.display = "none";
            video.style.display = "block";
            dC.style.display = "block";
        };
    }
}

// Implement lazy loading according to width
window.addEventListener("load", () => {
    switchDisplayBasedOnWidth();
    //once api is fetched , call updateClock() for every second
    fetchISTTime().then(() => {
        updateClock();  // (1) Run once immediately after time is fetched
        setInterval(updateClock, 1000); // (2) Run every second to update ticking time
    });
});

//Handling for each resize (changes : image, video)
window.addEventListener("resize", switchDisplayBasedOnWidth);
