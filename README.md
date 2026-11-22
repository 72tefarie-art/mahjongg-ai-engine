# 🀄 2026 American Mahjongg AI Coach & Game Engine

**[▶️ Play Live Now (Zero Installs / $0-Server Edge App)](https://72tefarie-art.github.io/mahjongg-ai-engine/)**  
**[🎥 Watch 60-Second Coach Tsege AI Gameplay Demo](./demo/coach-tsege-demo.mp4)**

A self-contained, client-side **2026 NMJL American Mahjongg** game engine and spoken AI strategy coach powered by a hybrid **Symbolic Rules + ONNX Neural Network** architecture—running 100% in the browser at **$0 hosting cost**.

---

### ✨ Key Engineering Highlights
- **Hybrid Symbolic + Neural AI (`<50 KB` ONNX):** Combines an exact ~1,200-vector 2026 NMJL pattern evaluator and real-time dead-tile scarcity tracker with a browser-side neural network (`ONNX Runtime Web`) trained via multi-persona synthetic self-play (`self-play-v5-v6.js` + `train_onnx_v6.py`).
- **Coach Tsege (Explainable AI Voice Tutor):** Translates live tile-closeness and discard scarcity math into spoken strategic advice using the `Web Speech API` (`utter.onend` paced so voice lines never clip).
- **Visual Rack Guidance:** Instant green/red tile highlights and `⚠️ Scarce` alerts guide new and intermediate players through the Charleston and mid-game without slowing down gameplay.
- **Built-In Telemetry & 3-Minute Video Recorder:** Includes a live `(State → Action → Outcome)` JSONL inspection drawer (`⚙️ AI Pipeline & Live JSONL`) and one-click `MediaRecorder` gameplay export.

### 🚀 Run Locally
No build steps or dependencies required—just open `index.html` in any modern browser.
