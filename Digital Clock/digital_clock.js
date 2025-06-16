
let istTime;

async function fetchISTTime() {
    try {
        const response = await fetch("https://timeapi.io/api/timezone/zone?timeZone=Asia%2FKolkata");
        const data = await response.json();

        // Parse the currentLocalTime field (e.g., "2025-06-16T11:44:34.6022859")
        istTime = new Date(data.currentLocalTime);
    } catch (error) {
        console.error("Failed to fetch IST time:", error);
        document.getElementById("digital_clock").textContent = "IST time not available.";
    }
}

function updateClock() {
    if (!istTime) return;
    console.log(istTime)
    istTime.setSeconds(istTime.getSeconds() + 1); // Simulate ticking

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
    // console.log(currTime);
}

// Start
fetchISTTime().then(() => {
    updateClock(); // Display immediately
    setInterval(updateClock, 1000); // Update every second
});

