
# 🧠 AI Text-to-Image Generator – Hugging Face API

Generate stunning AI-generated images using text prompts, powered by Hugging Face’s inference API. This project features a secure backend (API key protected) and a responsive frontend interface.

---

## 🔗 Links

- 🔗 **GitHub Repo:** [Varshini0817/JS – TextToImageGenerator](https://github.com/Varshini0817/JS/tree/main/TextToImageGenerator)
- 🌐 **Live Frontend:** [text-image-generator-vv.vercel.app](https://text-image-generator-vv.vercel.app/)
- 📘 **Hugging Face Task Reference:** [huggingface.co/docs/inference-providers/en/tasks/text-to-image](https://huggingface.co/docs/inference-providers/en/tasks/text-to-image)

> ⚠️ **Disclaimer:** Hugging Face provides a limited number of API calls for free users. Use your token responsibly.

---

## 🔧 Features

- 🎨 **Prompt-to-Image** – Generate AI images from your imagination using Hugging Face models.
- 🔐 **Secure API Handling** – API key is stored in the backend via `.env`, never exposed to users.
- 📏 **Dynamic Aspect Ratio** – Supports common ratios like `1:1`, `16:9`, and `9:16`.
- 🖼️ **Multiple Image Generation** – Create 1 to 4 images in one go.
- ⬇️ **One-Click Image Download** – Instantly download generated images directly from the UI.

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS (Responsive), JavaScript (DOM, Fetch API)
- **Backend:** Node.js, Express.js
- **API:** Hugging Face Inference API
- **Security:** Environment Variables (`.env`)

---

## 📁 Folder Structure

```
ImageGeneratorAI/
├── client/                     # Frontend files
│   ├── image.png               # Icon
│   ├── index.html              # Main HTML interface
│   ├── script.js               # Image generation logic
│   └── styles.css              # Styling and responsiveness
│
├── server/                     # Backend files
│   ├── index.js                # Express server for API proxying
│
├── .gitignore                  # Ignores node_modules, .env
├── package.json                # Backend dependencies
└── README.md                   # Project documentation
```

---

## ⚙️ How to Run Locally

### 1. Clone the repo
```bash
git clone https://github.com/Varshini0817/JS.git
cd JS/TextToImageGenerator
```

### 2. Install backend dependencies
```bash
cd server
npm install
```

### 3. Add Hugging Face API key
Create a file called `.env` inside the `server/` folder and add:
```env
API_KEY=hf_your_token_here
```

> Get your token from [Hugging Face → Access Tokens](https://huggingface.co/settings/tokens)

### 4. Run the backend
```bash
node index.js
```

### 5. Open the frontend
Open `client/index.html` in your browser directly or use a Live Server extension in your code editor.

---

## 🖼️ Supported Models (Sample)

- `black-forest-labs/FLUX.1-dev` – Fast and creative image generation model.
- `black-forest-labs/FLUX.1-schnell` – An optimized version of FLUX for quicker outputs.
- `stabilityai/stable-diffusion-xl-base-1.0` – High-quality model for photo-realistic images.

---
