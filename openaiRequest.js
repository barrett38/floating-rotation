const axios = require("axios");
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function askOpenAI() {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: "Say hello!",
        max_tokens: 5,
        temperature: 0.5,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    console.log(response.data.choices[0].text);
  } catch (error) {
    console.error("Error communicating with OpenAI:", error);
  }
}

askOpenAI();
