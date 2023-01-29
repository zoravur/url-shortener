const mongoose = require('mongoose');

// Connect to the MongoDB instance
mongoose.connect('mongodb://localhost:27017/urldb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define the URL schema
const urlSchema = new mongoose.Schema({
    originalURL: String,
    shortCode: String
});

// Create a model from the schema
const URL = mongoose.model('URL', urlSchema);

// Function to add a URL to the database
const addURL = (originalURL, shortCode) => {
    const newURL = new URL({
        originalURL: originalURL,
        shortCode: shortCode
    });

    newURL.save()
        .then(() => console.log('URL added to the database'))
        .catch(err => console.log(err));
}

// Function to check if a shortCode exists in the database
const checkShortCodeExists = async (shortCode) => {
    const url = await URL.findOne({ shortCode });
    return !!url;
}

// Function to find a URL by shortCode
const findURLByShortCode = async (shortCode) => {
    const url = await URL.findOne({ shortCode });
    return url;
}

const findURLByOriginalURL = async (originalURL) => {
    const url = await URL.findOne({ originalURL });
    return url;
}

// Function to update a URL by shortCode
const updateURLByShortCode = async (shortCode, update) => {
    const url = await URL.findOneAndUpdate({ shortCode }, update);
    return url;
}

// Function to delete a URL by shortCode
const deleteURLByShortCode = async (shortCode) => {
    const url = await URL.findOneAndDelete({ shortCode });
    return url;
}

// Function to check the existence of a URL by shortCode
const checkURLExistsByShortCode = async (shortCode) => {
    const url = await URL.findOne({ shortCode });
    return !!url;
}

module.exports = {
    addURL,
    checkShortCodeExists,
    findURLByShortCode,
    updateURLByShortCode,
    deleteURLByShortCode,
    checkURLExistsByShortCode
}

// Example usage:

// Add URL
// addURL('https://www.example.com', 'abc123');

// Check if shortCode exists
// checkShortCodeExists('abc123').then(exists => { console.log(exists) });

// Find URL by shortCode
// findURLByShortCode('abc123').then(url => { console.log(url) });

// Update URL by shortCode
// updateURLByShortCode('abc123', { originalURL: 'https://www.example2.com' }).then(url => { console.log(url) });

// Delete URL by shortCode
// deleteURLByShortCode('abc123').then(url => { console.log(url) });

// Check URL existence by shortCode
// checkURLExistsByShortCode('abc123').then(exists => { console.log(exists) });
