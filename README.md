# 2026 American Mahjongg — Interactive AI Coach & Game Engine

A free, browser-based American Mahjongg game and personal strategy coach that runs completely on your device with no sign-ups, subscriptions, or servers required.

👉 **[Play the Live Demo](https://72tefarie-art.github.io/mahjongg-ai-engine/)**

<img width="1440" height="799" alt="2026 American Mahjongg AI Coach Gameplay" src="[https://github.com/user-attachments/assets/28d46dd4-d1de-4db6-995b-412edea2a1c6](https://github.com/user-attachments/assets/28d46dd4-d1de-4db6-995b-412edea2a1c6)" />

## Key Features & Player Benefits
- **Plays the Full 2026 Rulebook:** Automatically checks your tiles against all 37 official 2026 National Mah Jongg League (NMJL) winning hands in real time—*eliminating card-flipping guesswork for beginners while keeping tournament rules intact*.
- **Tracks "Dead" Tiles Like a Pro:** Watches the discard pile and alerts you when needed tiles are scarce or gone—*helping you pivot early instead of wasting turns on un-winnable hands*.
- **Live Voice Coaching (Coach Tsege):** Highlights which tiles to keep (green) and which to throw (red), grades your moves, and explains strategy out loud without cutting off mid-sentence—*turning every practice game into a guided lesson*.
- **Built-In 3-Minute Demo Recorder:** Captures a speech-synced AI walkthrough video directly in your browser—*making it effortless to review your games or share demos with zero external recording software*.
- **Smart AI Opponents:** Play against three distinct computer personalities—an **Aggressive Caller**, a **Defensive Hoarder**, and a **Run Specialist**—*giving you realistic table dynamics instead of predictable bot play*.

## Ways to Play
1. **Solo vs. AI Opponents (Standard Mode):** Play a full 4-player game against three distinct AI personas while Coach Tsege highlights your best keeps (green) and discards (red) in real time.
2. **Watch & Learn (3-Minute AI Walkthrough):** Click **"🎥 Record AI + Coach (3m)"** in the top bar to sit back while the AI plays and narrates its strategy out loud—and optionally save the video to review later.
3. **Under-the-Hood Inspection (Developer Mode):** Click **"⚙️ AI Pipeline & Live JSONL"** in the bottom-right corner during any game to watch live state-action telemetry generate in real time.

## Tech Stack & AI Architecture

| Layer | Discipline | Languages & Tools | Role & Engineering Value |
| :--- | :--- | :--- | :--- |
| **Rules Engine & Coach (`index.html`)** | **Heuristic & Symbolic AI** | JavaScript (ES6+), HTML5, Tailwind CSS | Evaluates ~1,200 suit-expanded 2026 pattern vectors with turn-cached scoring, discard scarcity tracking, and `Web Speech` / `Web Audio` coaching—*delivering 60fps play at $0 server cost*. |
| **Self-Play Simulator (`self-play-v5-v6.js`)** | **Data Engineering & Synthetic Data** | Node.js / JavaScript, JSONL | Logs `(State → Action → Outcome)` decisions across distinct bot personas—*preventing self-play mode collapse and generating clean training trajectories*. |
| **Model Training (`train_onnx_v6.py`)** | **Machine Learning & Data Science** | Python, NumPy, scikit-learn, `skl2onnx` | Vectorizes 71-feature game states and trains a compact `MLPClassifier` to predict win probabilities—*producing lightweight `<50 KB` neural weights*. |
| **Browser Inference (`onnx-browser-hook.js`)** | **Edge / Client-Side AI Deployment** | JavaScript, ONNX Runtime Web (`ort.min.js`) | Runs neural predictions directly inside the user's browser with automatic heuristic fallback—*completing a zero-backend AI loop*. |

## Local ML Training (Optional)
```bash
# Install Python dependencies and train the ONNX model from JSONL trajectories
pip install numpy scikit-learn skl2onnx
python train_onnx_v6.py
