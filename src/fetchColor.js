async function fetchColorData() {
  try {
    // First, trigger the color fetching process
    const fetchResponse = await fetch("/fetch-color");
    const fetchData = await fetchResponse.json();
    console.log("Fetched color from backend:", fetchData.color); // Log the fetched color

    // Then, fetch the latest color data
    const response = await fetch("/color");
    const data = await response.json();
    console.log("Fetched color data:", data); // Log the fetched color data
    updateCSS(fetchData.color); // Use the fetched color
  } catch (error) {
    console.error("Error fetching color data:", error);
  }
}

function updateCSS(color) {
  console.log("Updating CSS with color:", color); // Log the color being applied
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

document.addEventListener("DOMContentLoaded", fetchColorData);

// needs work still
