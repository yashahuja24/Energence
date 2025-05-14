import pandas as pd
import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import joblib
import os

# Set seeds for reproducibility
np.random.seed(42)
tf.random.set_seed(42)

# Path to the directory
DATA_DIR = "wind_dataset"

# Load and merge all CSVs in the folder
all_files = [os.path.join(DATA_DIR, f) for f in os.listdir(DATA_DIR) if f.endswith('.csv')]
df_list = [pd.read_csv(file) for file in all_files]
df = pd.concat(df_list, ignore_index=True)

# Drop 'Time' column
df = df.drop("Time", axis=1)

# Split features and target
X = df.drop("Power", axis=1).values
y = df["Power"].values

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Normalize features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Save scaler
joblib.dump(scaler, "wind_scaler.save")

# Build the model
model = tf.keras.Sequential([
    tf.keras.layers.Dense(128, activation="relu", input_shape=(X_train.shape[1],)),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(64, activation="relu"),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(32, activation="relu"),
    tf.keras.layers.Dense(1)  # Output layer
])

# Compile model
model.compile(optimizer='adam', loss='mean_squared_error', metrics=['mae'])

# Train model
history = model.fit(X_train, y_train, epochs=100, batch_size=32, validation_split=0.1, verbose=1)

# Evaluate
test_loss, test_mae = model.evaluate(X_test, y_test, verbose=1)
print(f"\nTest MAE: {test_mae:.4f}")

# Save model
model.save("wind_power_model.h5")
print("\n✅ Model saved as 'wind_power_model.h5'")
