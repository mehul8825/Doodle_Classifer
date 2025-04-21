from flask import Flask, render_template, request, jsonify
import numpy as np
import tensorflow as tf
from PIL import Image, ImageOps
import io
import base64

app = Flask(__name__)

# Load the trained model
model = tf.keras.models.load_model('model/quickdraw_model.h5')

# Categories
class_names = ["rainbow", "dragon", "eye"]


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Receive base64 image data
        data = request.form['image']
        header, encoded = data.split(",", 1)
        image_bytes = base64.b64decode(encoded)
        image = Image.open(io.BytesIO(image_bytes)).convert("L")  # Grayscale
        image = ImageOps.invert(image)  # Invert black on white background
        image = image.resize((28, 28))

        # Convert to numpy and normalize
        image_array = np.array(image) / 255.0
        image_array = image_array.reshape(1, 28, 28, 1)

        # Predict
        prediction = model.predict(image_array)[0]
        predicted_class = class_names[np.argmax(prediction)]

        return jsonify({'prediction': predicted_class})
    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(debug=True)
