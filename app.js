const cols = document.querySelectorAll(".column");

document.addEventListener("keydown", (event) => {
  if (event.code.toLocaleLowerCase() === "space") {
    event.preventDefault();
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
  } else if (type === "copy") {
    const tooltip = event.target.closest(".tooltip");
    const tooltipText = tooltip.querySelector(".tooltiptext");
    copyOnClick(event.target.textContent, tooltipText);
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

const copyOnClick = (text, tooltipText) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      tooltipText.textContent = "Готово";
      setTimeout(() => {
        tooltipText.textContent = "Скопировать";
      }, 1000); // Меняет текст обратно через 1 секунду
    })
    .catch((err) => {
      console.error("Не удалось скопировать текст: ", err);
    });
};

const setRandomColors = (isInitial) => {
  const colors = isInitial ? getColorsFromHash() : [];

  cols.forEach((col, index) => {
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    const text = col.querySelector("h2");
    const btn = col.querySelector("button");
    const popup = col.querySelector(".tooltiptext");

    const randomColor = isInitial
      ? colors[index]
        ? colors[index]
        : generateRandomColor()
      : generateRandomColor();

    if (isLocked) {
      colors.push(text.textContent);
      return;
    }

    if (!isInitial) {
      colors.push(randomColor);
    }

    text.innerHTML = randomColor;
    col.style.background = randomColor;

    setTextColor(popup, randomColor);
    setTextColor(text, randomColor);
    setTextColor(btn, randomColor);
  });

  updateColorsHash(colors);
};

const setTextColor = (text, color) => {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "black" : "white";
};

const updateColorsHash = (colors = []) => {
  document.location.hash = colors
    .map((col) => {
      return col.toString().substring(1);
    })
    .join("-");
};

const getColorsFromHash = () => {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((randomColor) => "#" + randomColor);
  }
  return [];
};

setRandomColors(true);
