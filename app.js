const cols = document.querySelectorAll(".column");
const btn = document.querySelectorAll("button");
const italic = document.querySelectorAll("i");

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.code.toLocaleLowerCase() === "space") {
    setRandomColors();
  }
});

document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;

  if (type === "lock") {
    const node =
      event.target.tagName.toLowerCase() === "i"
        ? event.target
        : event.target.children[0];

    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
  }
});

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
    const text = col.querySelector("h2");
    const btn = col.querySelector("button");
    const randomColor = generateRandomColor();
    text.innerHTML = randomColor;
    col.style.background = randomColor;
    setTextColor(text, randomColor);
    setTextColor(btn, randomColor);
  });
};

const setTextColor = (text, color) => {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "black" : "white";
};

setRandomColors();
