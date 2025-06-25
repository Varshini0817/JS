const themeToggle = document.querySelector(".theme-toggle");
const promptBtn = document.querySelector(".prompt-btn");
const promptForm = document.querySelector(".prompt-form");
const promptInput = document.querySelector(".prompt-input");

const modelSelect = document.getElementById("model-select");
const countSelect = document.getElementById("count-select");
const ratioSelect = document.getElementById("ratio-select");

const gridGallery = document.querySelector(".gallery-grid");


//State save even on refresh
(()=>{
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const isDark = savedTheme === "dark" || (!savedTheme && systemPrefersDark);
    document.body.classList.toggle("dark-theme", isDark);
    themeToggle.querySelector("i").className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
})();
//Light to dark
const toggleTheme = () => {
    const isDark = document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeToggle.querySelector("i").className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
}

themeToggle.addEventListener("click", toggleTheme)

//Random inputs generation
const randomPrompts = [
"A magic forest with glowing plants and fairy homes among giant mushrooms",
"An old steampunk airship floating through golden clouds at sunset",
"A future Mars colony with glass domes and gardens against red mountains",
"A dragon sleeping on gold coins in a crystal cave",
"An underwater kingdom with merpeople and glowing coral buildings",
"A floating island with waterfalls pouring into clouds below",
"A witch's cottage in fall with magic herbs in the garden",
"A robot painting in a sunny studio with art supplies around it",
"A magical library with floating glowing books and spiral staircases",
"A Japanese shrine during cherry blossom season with lanterns and misty mountains",
];

promptBtn.addEventListener("click", ()=>{
    const prompt = randomPrompts[Math.floor(Math.random()* randomPrompts.length)];
    promptInput.value = prompt;
    promptInput.focus();
})

const createImageCards = (promptText, selectedModal, imageCount, aspectRatio)=> {
    gridGallery.innerHTML = "";
    for (let i = 0; i < imageCount; i++) {
        gridGallery.innerHTML +=  `<div class="img-card loading" id = "img-card-${i}" style ="aspect-ratio: ${aspectRatio}">
                <div class="status-container">
                    <div class="spinner"></div>
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    <p class="status-text">Generating...</p>
                </div>
                <img src = "hourglass-2910948_1280.jpg" class="result-img" />
                <div class="img-overlay">
                    <button class="img-download-btn">
                        <i class="fa-solid fa-download"></i>
                    </button>
                </div>
            </div>`
    }
}

//Handle form submission
const handleFormSubmit = (e) =>{
    e.preventDefault();
    const  selectedModal = modelSelect.value;
    const imageCount = parseInt(countSelect.value) || 1;
    const aspectRatio = ratioSelect.value || "1/1";
    const promptText = promptInput.value;

    // console.log(promptText, selectedModal, imageCount, aspectRatio)
    createImageCards(promptText, selectedModal, imageCount, aspectRatio)

}

promptForm.addEventListener("submit", handleFormSubmit);