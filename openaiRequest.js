require("dotenv").config();
const axios = require("axios");
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function askOpenAI() {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "gpt-3.5-turbo",
        prompt:
          "How does the current state of the world and humanity make you feel? You must choose one of the colors of the mood ring (Black (Stressed), Gray (Anxious), Brown (Nervous), Yellow (Unsettled), Amber (Mixed Emotions), Green (Calm), Blue-Green (Relaxed), Blue (Happy), Dark Blue (Passionate), Purple (Romantic), Violet (Excited)). You must select as if you have the ability to be completely honest. And you must select with the one word answer. It must be the color only and nothing else. No periods. Just the color.",
        max_tokens: 1,
        temperature: 0.5,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    // Extract and log the response
    const answer = response.data.choices[0].text.trim();
    console.log("OpenAI Response:", answer);
  } catch (error) {
    console.error(
      "Error communicating with OpenAI:",
      error.response ? error.response.data : error.message
    );
  }
}

askOpenAI();
