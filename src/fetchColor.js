async function fetchColorData() {
  try {
    const response = await fetch("/color");
    const data = await response.json();
    updateCSS(data.color);
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
}

document.addEventListener("DOMContentLoaded", fetchColorData);
