const tf = require('@tensorflow/tfjs-node'); // TensorFlow.js untuk Node.js

// URL publik model dan weight
const modelUrl = 'https://storage.googleapis.com/test-gluco/models/model.json';
let model = null;

// Fungsi untuk memuat model
async function loadModel() {
  try {
    console.log('Memuat model dari:', modelUrl);
    model = await tf.loadGraphModel(modelUrl);
    console.log('Model berhasil dimuat!');
  } catch (error) {
    console.error('Gagal memuat model:', error);
  }
}

// Panggil fungsi untuk memuat model saat server dijalankan
loadModel();

// Fungsi untuk prediksi diabetes
async function predictDiabetes(req, res) {
  if (!model) {
    return res.status(500).json({ error: 'Model belum dimuat' });
  }

  const inputData = req.body.input; // Ambil input dari body
  if (!inputData || !Array.isArray(inputData) || inputData[0].length !== 8) {
    return res.status(400).json({ error: 'Data input tidak valid' });
  }

  try {
    // Konversi inputData ke TensorFlow.js tensor
    const tensorInput = tf.tensor2d(inputData, [1, inputData[0].length]);

    // Prediksi
    const prediction = model.predict(tensorInput);
    const predictedClass = prediction.argMax(-1).dataSync()[0];

    // Pemetaan kelas ke label
    const classLabels = ['Normal', 'Pra-diabetes', 'Diabetes Terkendali', 'Diabetes Tidak Terkendali'];

    // Kirim hasil prediksi
    return res.json({
      predicted_class: classLabels[predictedClass],
      prediction_confidence: Array.from(prediction.dataSync())
    });
  } catch (err) {
    console.error('Terjadi kesalahan saat prediksi:', err);
    return res.status(500).json({ error: 'Terjadi kesalahan saat prediksi' });
  }
}

module.exports = {
  predictDiabetes
};
