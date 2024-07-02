const cols = document.querySelectorAll(".column");

const generateRandomColor = () => {
  const hexCodes = "0123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }
  return "#" + color;
};

const setRandomColors = () => {
  cols.forEach((col) => {
    col.style.background = generateRandomColor();
  });
};

setRandomColors();
