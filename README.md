# 2026 American Mahjongg — Interactive AI Coach & Game Engine

A free, browser-based American Mahjongg game and personal strategy coach that runs completely on your device with no sign-ups, subscriptions, or servers required.

👉 **[Play the Live Demo](https://72tefarie-art.github.io/mahjongg-ai-engine/)**

![2026 American Mahjongg AI Coach Gameplay](./screenshot.png)

## Key Features & Player Benefits
- **Plays the Full 2026 Rulebook:** Automatically checks your tiles against all 37 official 2026 National Mah Jongg League (NMJL) winning hands in real time—*eliminating card-flipping guesswork for beginners while keeping tournament rules intact*.
- **Tracks "Dead" Tiles Like a Pro:** Watches the discard pile and alerts you when needed tiles are scarce or gone—*helping you pivot early instead of wasting turns on un-winnable hands*.
- **Live Voice Coaching (Coach Tsege):** Highlights which tiles to keep (green) and which to throw (red), grades your moves, and explains strategy out loud without cutting off mid-sentence—*turning every practice game into a guided lesson*.
- **Built-In 3-Minute Demo Recorder:** Captures a speech-synced AI walkthrough video directly in your browser—*making it effortless to review your games or share demos with zero external recording software*.
- **Smart AI Opponents:** Play against three distinct computer personalities—an **Aggressive Caller**, a **Defensive Hoarder**, and a **Run Specialist**—*giving you realistic table dynamics instead of predictable bot play*.

## Tech Stack & AI Architecture

| Layer | Discipline | Languages & Tools | Role & Engineering Value |
| :--- | :--- | :--- | :--- |
| **Rules Engine & Coach (`index.html`)** | **Heuristic & Symbolic AI** | JavaScript (ES6+), HTML5, Tailwind CSS | Evaluates ~1,200 suit-expanded 2026 pattern vectors with turn-cached scoring, discard scarcity tracking, and `Web Speech` / `Web Audio` coaching—*delivering 60fps play at $0 server cost*. |
| **Self-Play Simulator (`self-play-v5-v6.js`)** | **Data Engineering & Synthetic Data** | Node.js / JavaScript, JSONL | Logs `(State → Action → Outcome)` decisions across distinct bot personas—*preventing self-play mode collapse and generating clean training trajectories*. |
| **Model Training (`train_onnx_v6.py`)** | **Machine Learning & Data Science** | Python, NumPy, scikit-learn, `skl2onnx` | Vectorizes 71-feature game states and trains a compact `MLPClassifier` to predict win probabilities—*producing lightweight `<50 KB` neural weights*. |
| **Browser Inference (`onnx-browser-hook.js`)** | **Edge / Client-Side AI Deployment** | JavaScript, ONNX Runtime Web (`ort.min.js`) | Runs neural predictions directly inside the user's browser with automatic heuristic fallback—*completing a zero-backend AI loop*. |

## Quick Start

### Play & Demo in Browser
1. Open the **[Live GitHub Pages Demo](https://72tefarie-art.github.io/mahjongg-ai-engine/)** directly in your browser.
2. Click **"🎥 Record AI + Coach (3m)"** in the top bar to watch or record a speech-synced guided game.
3. Click **"⚙️ AI Pipeline & Live JSONL"** in the bottom-right corner to inspect live telemetry and download sample trajectories.

### Train the Neural Evaluator Locally (Optional)
```bash
# 1. Install Python dependencies and train the ONNX model from JSONL trajectories
pip install numpy scikit-learn skl2onnx
python train_onnx_v6.py
