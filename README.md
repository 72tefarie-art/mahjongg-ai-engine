# Synthetic Data Factory & Heuristic-to-ML Game Engine (American Mahjongg — 2026 Edition)

A zero-server, static browser game engine and synthetic data generation pipeline built to demonstrate closed-loop AI systems design without ongoing cloud infrastructure costs.

## Architecture Overview
- **v1–v2 Deterministic Combinatorial Rules Engine (`index.html`):** Evaluates ~1,200 expanded pattern vectors with Joker eligibility rules, multi-phase Charleston swaps, interrupt claim windows, and state-snapshot rollbacks.
- **v3–v4 Real-Time Coaching & JSONL Telemetry:** Weighted utility scoring (`KEEP / DROP` guidance) paired with a structured `(State → Action → Outcome)` JSONL logger.
- **v5/v6 Headless Self-Play & Behavioral Personas (`self-play-v5-v6.js`):** Decouples rules evaluation from DOM rendering to simulate thousands of games across distinct AI personas (`Aggressive Caller`, `Defensive Hoarder`, `Run Specialist`).
- **v6 Static ONNX Browser Inference (`train_onnx_v6.py` + `onnx-browser-hook.js`):** Trains a compact neural evaluator on self-play `.jsonl` trajectories and runs inference client-side via `onnxruntime-web`.

## Live Static Demo
Play directly in your browser with zero login walls or backend servers via **GitHub Pages**, and click **"AI Pipeline & Live JSONL"** in the bottom-right corner to inspect live telemetry and download sample trajectories.