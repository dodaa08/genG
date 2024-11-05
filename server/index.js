const OpenAI = require('openai');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const app = express();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use environment variable for API key
});

app.use(express.json());
app.use(cors());

app.post('/generate-haiku', async (req, res) => {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'Write a haiku about recursion in programming.' }],
        max_tokens: 20,
      });
  
      res.json({ haiku: completion.choices[0].message.content.trim() });
    } catch (error) {
      console.error('Error generating completion:', error);
      
      if (error.status === 429) {
        res.status(429).json({ error: 'Quota exceeded. Please try again later.' });
      } else {
        res.status(500).json({ error: 'An error occurred while generating the haiku.', details: error.message });
      }
    }
  });
  

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
