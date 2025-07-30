import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report, accuracy_score
import joblib

# Step 1: Load dataset
df = pd.read_csv("survey_data.csv")

# Step 2: Split features and target
X = df.drop("assessment", axis=1)
y = df["assessment"]

# Step 3: Encode target labels ("normal", "mild", "severe")
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)  # normal=1, mild=2, severe=0 (varies by run)

# Optional: Save label encoder
joblib.dump(label_encoder, "label_encoder.pkl")

# Step 4: Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)

# Step 5: Train RandomForest model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Step 6: Evaluate model
y_pred = model.predict(X_test)
print("\nClassification Report:\n", classification_report(y_test, y_pred))
print("Accuracy:", accuracy_score(y_test, y_pred))

# Step 7: Save the model
joblib.dump(model, "survey_model.pkl")
print("Model saved as 'survey_model.pkl'")
