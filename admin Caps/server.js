const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

// Set up MongoDB connection
mongoose.connect('mongodb://localhost:27017/Capstone', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the schema and model for a tour
const tourSchema = new mongoose.Schema({
    image: Buffer,
    title: String,
    locations: String,
    date: Date,
    description: String,
    price: Number // Adding price field for Indonesian Rupiah (IDR)
});

const Tour = mongoose.model('Tour', tourSchema);

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up multer for image upload
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/add-tour', upload.single('image'), (req, res) => {
    const newTour = new Tour({
        image: req.file.buffer, // Store the binary data
        title: req.body.title,
        locations: req.body.locations,
        date: req.body.date,
        description: req.body.description,
        price: req.body.price // Store the price
    });

    newTour.save()
        .then(() => res.send('Tour added successfully!'))
        .catch(err => res.status(400).send('Error: ' + err));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
