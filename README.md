# 2026 American Mahjongg — Interactive AI Coach & Game Engine

A free, browser-based American Mahjongg game and personal strategy coach that runs completely on your device with no sign-ups, subscriptions, or servers required.

## What It Does (In Plain English)
- **Plays the Full 2026 Rulebook:** Automatically checks your tiles against all 37 official 2026 National Mah Jongg League (NMJL) winning hands in real time.
- **Tracks "Dead" Tiles Like a Pro:** Watches the discard pile so you don't waste turns chasing a winning pattern whose needed tiles have already been thrown away.
- **Live Voice Coaching (Coach Tsege):** Highlights which tiles to keep (green) and which to throw (red), grades your moves, and talks you through strategy out loud without cutting off mid-sentence.
- **Built-In Demo Recorder:** Includes a one-click 3-minute walkthrough mode that records the AI playing and explaining its moves so you can watch or share it later.
- **Smart AI Opponents:** Play against three distinct computer personalities—a fast caller, a defensive reader, and a concealed-hand specialist—all trained to simulate realistic table play.

## How It Works Under the Hood (For Developers)
- **Zero-Server Static Architecture (`index.html`):** Runs ~1,200 suit-expanded 2026 pattern checks locally in the browser with turn-cached evaluation and Web Audio sound effects.
- **Synthetic Data & Telemetry (`self-play-v5-v6.js`):** Logs `(State → Action → Outcome)` game decisions in JSONL format and simulates thousands of headless self-play games across distinct bot personas.
- **Browser-Side Machine Learning (`train_onnx_v6.py` + `onnx-browser-hook.js`):** Trains a lightweight neural network on self-play data and runs predictions directly in the browser via ONNX Runtime Web.

## Try It Live
Open the **GitHub Pages** link to play immediately in your browser, click **"🎥 Record AI + Coach (3m)"** at the top to watch or record a guided game, or click **"⚙️ AI Pipeline & Live JSONL"** in the bottom-right corner to view live game data.
