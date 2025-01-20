import { canvas } from "./main.js";
import { Firework } from "./firework.js";

class MenuItem {
  constructor(parentElement) {
    this.inputs = {};
    this.parentElement = parentElement;
    this.remove = false;
  }

  createElements() {
    let inputElements = [];

    const div = document.createElement("div");
    div.setAttribute("class", "input-container");

    const labelX = document.createElement("label");
    labelX.setAttribute("for", "x");
    labelX.textContent = "x";
    inputElements.push(labelX);
    const inputX = document.createElement("input");
    inputX.setAttribute("type", "range");
    inputX.setAttribute("id", "x");
    inputX.setAttribute("min", "0");
    inputX.setAttribute("max", `${canvas.width}`);
    inputElements.push(inputX);

    const labelY = document.createElement("label");
    labelY.setAttribute("for", "y");
    labelY.textContent = "y";
    inputElements.push(labelY);
    const inputY = document.createElement("input");
    inputY.setAttribute("type", "range");
    inputY.setAttribute("id", "y");
    inputY.setAttribute("min", "0");
    inputY.setAttribute("max", `${canvas.height}`);
    inputElements.push(inputY);

    const forceLabel = document.createElement("label");
    forceLabel.setAttribute("for", "force");
    forceLabel.textContent = "force";
    inputElements.push(forceLabel);
    const force = document.createElement("input");
    force.setAttribute("id", "force");
    force.setAttribute("type", "range");
    force.setAttribute("min", "2");
    force.setAttribute("max", "8");
    inputElements.push(force);

    const particleCountLabel = document.createElement("label");
    particleCountLabel.setAttribute("for", "particle-count");
    particleCountLabel.textContent = "particle count";
    inputElements.push(particleCountLabel);
    const particleCount = document.createElement("input");
    particleCount.setAttribute("id", "particle-count");
    particleCount.setAttribute("type", "number");
    inputElements.push(particleCount);

    const colorLabel = document.createElement("label");
    colorLabel.setAttribute("for", "color");
    colorLabel.textContent = "color";
    inputElements.push(colorLabel);
    const colorInput = document.createElement("input");
    colorInput.setAttribute("id", "color");
    colorInput.setAttribute("type", "color");
    inputElements.push(colorInput);

    const removeButton = document.createElement("button");
    removeButton.textContent = "remove";
    inputElements.push(removeButton);

    removeButton.addEventListener("click", () => {
      this.remove = true;
      this.removeElements();
    });

    this.inputs.inputX
      ? (inputX.value = this.inputs.inputX)
      : (inputX.value = this.inputs.inputX = canvas.width / 2);
    this.inputs.inputY
      ? (inputY.value = this.inputs.inputY)
      : (inputX.value = this.inputs.inputY = canvas.height / 2);
    this.inputs.force
      ? (force.value = this.inputs.force)
      : (force.value = this.inputs.force = 3);
    this.inputs.particleCount
      ? (particleCount.value = this.inputs.particleCount)
      : (particleCount.value = this.inputs.particleCount = 10);
    this.inputs.color
      ? (colorInput.value = this.inputs.color)
      : (colorInput.value = this.inputs.color = "#ff00ff");

    for (let i = 0; i <= inputElements.length; i += 2) {
      const inputContainer = document.createElement("div");
      inputContainer.setAttribute("class", "single-input");
      inputContainer.appendChild(inputElements[i]);
      i == inputElements.length - 1
        ? null
        : inputContainer.appendChild(inputElements[i + 1]);

      div.appendChild(inputContainer);
    }

    this.parentElement.appendChild(div);

    inputX.addEventListener("input", () => {
      this.inputs.inputX = Number(inputX.value);
    });

    inputY.addEventListener("input", () => {
      this.inputs.inputY = Number(inputY.value);
    });

    force.addEventListener("input", () => {
      this.inputs.force = Number(force.value);
    });

    particleCount.addEventListener("input", () => {
      this.inputs.particleCount = Number(particleCount.value);
    });

    colorInput.addEventListener("input", () => {
      this.inputs.color = colorInput.value;
    });

    this.element = div;
  }

  removeElements() {
    this.element.remove();
  }

  createFirework() {
    this.firework = new Firework(
      this.inputs.inputX,
      this.inputs.inputY,
      this.inputs.force,
      this.inputs.particleCount,
      this.inputs.color,
    );
    this.firework.launch();
  }

  updateFirework() {
    this.firework.update();
  }
}

export { MenuItem };
