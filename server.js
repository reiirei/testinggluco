const express = require('express');
const bodyParser = require('body-parser');
const diabetesRoutes = require('./routes/diabetesRoutes');

const app = express();

// Middleware parsing JSON body
app.use(bodyParser.json());

// Routing prediksi diabetes
app.use('/diabetes', diabetesRoutes);

// Jalankan server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
