require("dotenv").config();
const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const COLOR_FILE = path.join(__dirname, "colorData.json");

app.get("/fetch-color", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        prompt: "Generate a color scheme for today",
        max_tokens: 50,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const colorData = response.data.choices[0].text.trim();
    fs.writeFileSync(COLOR_FILE, JSON.stringify({ color: colorData }));

    res.json({ color: colorData });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch color data" });
  }
});

app.get("/color", (req, res) => {
  if (fs.existsSync(COLOR_FILE)) {
    const colorData = JSON.parse(fs.readFileSync(COLOR_FILE));
    res.json(colorData);
  } else {
    res.status(404).json({ error: "Color data not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
