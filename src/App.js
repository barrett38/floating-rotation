import React, { useEffect } from "react";
import "./App.css";

async function fetchColorData() {
  try {
    // First, trigger the color fetching process
    await fetch("/fetch-color");

    // Then, fetch the latest color data
    const response = await fetch("/color");
    const data = await response.json();
    updateCSS(data[data.length - 1].color); // Use the latest color
  } catch (error) {
    console.error("Error fetching color data:", error);
  }
}

function updateCSS(color) {
  const styleSheet = document.styleSheets[0];
  const keyframes = `
    @keyframes changeColor {
      0% { background: radial-gradient(circle at 20% 20%, #ffffff, ${color}); }
      100% { background: radial-gradient(circle at 30% 30%, #ffffff, ${color}); }
    }
  `;
  styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  document.querySelector(".floating-object").style.animation =
    "float 30s ease-in-out infinite, rotate 15s linear infinite, changeColor 20s linear infinite, fadeIn 2s ease-in-out forwards";
}

function FloatingObject() {
  useEffect(() => {
    fetchColorData();
  }, []);

  return <div className="floating-object"></div>;
}

function App() {
  return (
    <div className="App">
      <FloatingObject />
    </div>
  );
}

export default App;
