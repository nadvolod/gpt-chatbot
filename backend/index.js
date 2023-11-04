const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Make sure this line is at the top

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Ensure to use your API key securely

app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        const response = await axios.post(
            OPENAI_API_URL,
            {
                messages: [
                    {
                        role: "user",
                        content: userMessage
                    }
                ],
                model: 'gpt-3.5-turbo',
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                },
            }
        );
        const botMessage = response.data.choices[0].message.content.trim();
        res.json({ message: botMessage });
    } catch (error) {
        console.error('Error calling OpenAI API: ', error.response.data);
        res.status(500).send('Error processing your request');
    }
});

app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
});
