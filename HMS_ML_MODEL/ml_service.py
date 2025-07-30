from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load model and label encoder
model = joblib.load("survey_model.pkl")
label_encoder = joblib.load("label_encoder.pkl")

# Suggestion messages
SUGGESTIONS = {
  "Normal": "The patient's condition appears within normal limits. No immediate intervention is necessary. Continue routine observation and wellness monitoring.",
  "Moderate": "The patient exhibits moderate symptoms. It is advised to begin a structured motor therapy program and schedule a follow-up assessment in 4 weeks.",
  "Severe": "The patient presents with significant symptoms. Immediate referral to a neurologist or movement disorder specialist is strongly recommended for further evaluation and treatment planning."
}


@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    required_fields = [
        "facialMuscles", "lipsPerioral", "jaw", "tongue",
        "upperExtremities", "lowerExtremities", "neckShouldersHips",
        "severityOfMovements", "incapacitationDueToMovements", "patientAwareness",
        "emotionalDistress", "globalRating"
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    try:
        input_data = [int(data[field]) for field in required_fields]
        input_array = np.array(input_data).reshape(1, -1)

        prediction_encoded = model.predict(input_array)[0]
        prediction_label = label_encoder.inverse_transform([prediction_encoded])[0]

        suggestion = SUGGESTIONS.get(prediction_label, "No suggestion available for this result.")

        return jsonify({
            "assessment": prediction_label,
            "suggestion": suggestion
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5001, debug=True)
