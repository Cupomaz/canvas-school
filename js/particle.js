import { gravity, c } from "./main.js";

class Particle {
  constructor(x, y, velX, velY, size, color, lifetime) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.size = size;
    this.color = color;
    this.lifetime = lifetime || 6.5;
    this.currentLifetime = this.lifetime;
  }

  hexToRgb(colorIndex) {
    const hexString = this.color.substring(
      colorIndex * 2 + 1,
      colorIndex * 2 + 3,
    );
    const decimal = parseInt(hexString, 16);
    return decimal.toString();
  }

  draw() {
    c.fillStyle = `rgb(${this.hexToRgb(0)}, ${this.hexToRgb(1)}, ${this.hexToRgb(2)})`;
    c.beginPath();
    c.arc(
      this.x,
      this.y,
      (this.currentLifetime / this.lifetime) * this.size,
      0,
      Math.PI * 2,
    );
    c.fill();
  }

  update() {
    this.velY += gravity;

    this.x += this.velX;
    this.y += this.velY;

    if (this.currentLifetime > 0 + 0.1) this.currentLifetime -= 0.1;
    this.draw();
  }
}

export { Particle };
