/**
 * v6 Zero-Server ONNX Browser Inference Bridge
 * Evaluates 71-feature state vectors directly inside the visitor's browser tab.
 */
class V6OnnxCoachBridge {
  constructor(modelUrl = './mahjongg_v6_coach.onnx') {
    this.modelUrl = modelUrl;
    this.session = null;
    this.ready = false;
  }

  async init() {
    try {
      if (typeof ort === 'undefined') {
        console.warn('[v6 ONNX] onnxruntime-web not loaded; using v3 heuristic evaluator.');
        return;
      }
      this.session = await ort.InferenceSession.create(this.modelUrl);
      this.ready = true;
      console.log('[v6 ONNX] Neural evaluator loaded in browser.');
    } catch (err) {
      console.warn('[v6 ONNX] Running in v3 heuristic fallback mode:', err.message);
    }
  }

  async predictWinProbability(featureArray71) {
    if (!this.ready || !this.session) return null;
    const inputTensor = new ort.Tensor('float32', Float32Array.from(featureArray71), [1, 71]);
    const results = await this.session.run({ state_input: inputTensor });
    const probs = results.probabilities?.data;
    return probs ? Number((probs[1] * 100).toFixed(1)) : null;
  }
}

window.v6Coach = new V6OnnxCoachBridge();
window.addEventListener('DOMContentLoaded', () => window.v6Coach.init());