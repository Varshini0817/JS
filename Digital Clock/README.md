🕰️ **IST Digital Clock with Responsive Background**
This project displays a real-time Indian Standard Time (IST) digital clock with a responsive, aesthetically pleasing background.

🌐 **Live Demo**
[Check it out here!](https://digital-clock-vv.vercel.app/)

🔧 **Features**
⏰ Live IST Clock – Fetches current IST from [TimeAPI](https://timeapi.io/api/timezone/zone?timeZone=Asia%2FKolkata) and updates every second.

⚠️ Note: You can change the time zone by modifying the API URL to your desired region.

📱 **Responsive Design**

For larger screens: A looping hourglass video plays as the background.

For smaller screens (≤ 768px): A static hourglass image is used with a soft gradient overlay.

🎬 Lazy Loading – Background video or image is only shown after fully loaded, with a custom animated loader in the meantime.

🌐 Auto Switching – UI dynamically switches between video and image on window resize, without requiring a reload.

🛠️ **Technologies Used**
HTML, CSS (Media Queries, Animations)

JavaScript (DOM manipulation, fetch, responsive handling)

📁 **File Overview**

index.html – Main HTML file

digital_clock.css – Styling for clock, loader, and responsiveness

digital_clock.js – Logic for time fetching, clock updating, and background handling

hour_glass.mp4 – Background video for desktops

hourglass-2910948_1280.jpg – Background image for mobile devices
