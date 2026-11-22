import json
import numpy as np
from sklearn.neural_network import MLPClassifier
from sklearn.model_selection import train_test_split
from skl2onnx import convert_sklearn
from skl2onnx.common.data_types import FloatTensorType

def load_jsonl_features(filepath):
    X, y = [], []
    with open(filepath, "r") as f:
        for line in f:
            row = json.loads(line)
            s = row["state"]
            # 71-dim input vector: 34 concealed + 34 visible river + 3 scalar context features
            features = (
                s["concealedCounts"]
                + s["visibleRiver"]
                + [s["turn"] / 80.0, s["exposedCount"] / 4.0, s["minPatternDistance"] / 14.0]
            )
            X.append(features)
            y.append(row["outcome"]["won_hand"])
    return np.array(X, dtype=np.float32), np.array(y, dtype=np.int64)

if __name__ == "__main__":
    print("Loading v6 self-play trajectories...")
    X, y = load_jsonl_features("v6_selfplay_dataset.jsonl")
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.15, random_state=42)

    # Compact MLP sized for <50 KB browser .onnx inference
    clf = MLPClassifier(hidden_layer_sizes=(64, 32), activation="relu", max_iter=25, random_state=42)
    clf.fit(X_train, y_train)
    print(f"Validation Win-Prediction Accuracy: {clf.score(X_test, y_test):.3f}")

    # Export to static ONNX binary (zero backend server needed at runtime)
    initial_type = [("state_input", FloatTensorType([None, X.shape[1]]))]
    onnx_model = convert_sklearn(clf, initial_types=initial_type, target_opset=15)

    with open("mahjongg_v6_coach.onnx", "wb") as f:
        f.write(onnx_model.SerializeToString())
    print("Exported static browser weights -> mahjongg_v6_coach.onnx")