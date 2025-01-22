import { Menu } from "./menu.js";

const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
const addButton = document.querySelector("#add");
const runButton = document.querySelector("#run");
const exportButton = document.querySelector("#export");
const menuElement = document.querySelector("#menu");
const menu = new Menu(menuElement);

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight;

let interval;
let run = true;
const gravity = 0.08;

function gameLoop() {
  document.addEventListener("keydown", (e) => {
    if (e.key == "Escape") run = false;
  });

  if (run == false) {
    console.log("stop");
    clearInterval(interval);
    return;
  }

  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  menu.updateFireworks();
}

addButton.addEventListener("click", () => {
  menu.add();
  menu.render();
});

runButton.addEventListener("click", () => {
  if (interval) {
    clearInterval(interval);
  }

  menu.render();
  menu.createFireworks();
  run = true;
  interval = setInterval(gameLoop, 17);
});

exportButton.addEventListener("click", () => {
  menu.export();
});

export { gravity, c, canvas };
