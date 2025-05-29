const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;
const WINDOW_SIZE = 10;
let windowNumbers = [];
const ID_URL_MAP = {
    p: 'http://20.244.56.144/evaluation-service/primes',
    f: 'http://20.244.56.144/evaluation-service/fibo',
    e: 'http://20.244.56.144/evaluation-service/even',
    r: 'http://20.244.56.144/evaluation-service/rand'
};
async function fetchNumbers(url) {
    try {
        const response = await axios.get(url, { timeout: 500 });
        return response.data.numbers || [];
    } catch (err) {
        return [];
    }
}

function updateWindow(newNumbers) {
    const uniqueNewNumbers = newNumbers.filter(num => !windowNumbers.includes(num));
    windowNumbers = [...windowNumbers, ...uniqueNewNumbers];

    if (windowNumbers.length > WINDOW_SIZE) {
        windowNumbers = windowNumbers.slice(windowNumbers.length - WINDOW_SIZE);
    }

    return windowNumbers;
}
function calculateAverage(numbers) {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return parseFloat((sum / numbers.length).toFixed(2));
}

app.get('/numbers/:numberid', async (req, res) => {
    const id = req.params.numberid;
    const url = ID_URL_MAP[id];

    if (!url) {
        return res.status(400).json({ error: 'Invalid number ID' });
    }

    const windowPrevState = [...windowNumbers];
    const numbers = await fetchNumbers(url);
    updateWindow(numbers);
    const avg = calculateAverage(windowNumbers);

    res.json({
        windowPrevState,
        windowCurrState: [...windowNumbers],
        numbers,
        avg
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Average Calculator microservice running on http://localhost:${port}`);
});
