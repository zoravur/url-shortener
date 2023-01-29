const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const { 
    addURL, 
    checkShortCodeExists,
    findURLByShortCode, 
    findURLByOriginalURL, 
    updateURLByShortCode, 
    deleteURLByShortCode, 
    checkURLExistsByShortCode
} = require('./db');

// Generates a random 6 character alphanumeric string
const generateShortCode = () => {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let shortCode = "";
    for (let i = 0; i < 6; i++) {
        shortCode += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return shortCode;
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.post('/create', async (req, res) => {
    const originalURL = req.body.url;
    if (!originalURL) {
        return res.status(400).send("Please provide a valid URL");
    }
    try {
        let shortCode = generateShortCode();
        // TODO: Check if shortCode exists in the database
        // while (await checkShortCodeExists(shortCode)) {
        //     shortCode = generateShortCode();
        // }

        const shortUrl = `http://localhost:3000/${shortCode}`;
        await addURL(originalURL, shortCode);
        res.json({ shortUrl });
    } catch(err) {
        res.status(500).send(err);
    }
});

app.get('/:shortCode', async (req, res) => {
    const url = await findURLByShortCode(req.params.shortCode);
    if (!url) {
        return res.status(404).send("Shortcode not found");
    }
    res.redirect(url.originalURL);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

