import { Particle } from "./particle.js";
import { canvas, gravity } from "./main.js";

class Firework {
  constructor(x, y, force, particlesCount, color) {
    this.x = x;
    this.y = y;
    this.force = force;
    this.particles = [];
    this.particlesCount = particlesCount;
    this.color = color;
    this.hasExploded = false;
  }

  generateParticles() {
    for (let i = 0; i < 2; i += 2 / this.particlesCount) {
      const velX = Math.cos(i * Math.PI) * this.force;
      const velY = Math.sin(i * Math.PI) * this.force;

      if (i > 0.5 && i < 1.5) -velX;
      if (i < 1) -velY;

      this.particles.push(
        new Particle(this.x, this.y, velX, velY, 4, this.color),
      );
    }
  }

  launch() {
    const initialVelocity = Math.sqrt(2 * gravity * (canvas.height - this.y));
    this.shell = new Particle(
      this.x,
      canvas.height,
      0,
      -initialVelocity,
      5,
      "#ffd105",
      100,
    );
    this.particles.push(this.shell);
  }

  update() {
    if (this.shell.velY >= 0 && this.hasExploded == false) {
      this.particles.pop();
      this.generateParticles();
      this.hasExploded = true;
    }

    this.particles.forEach((p) => {
      p.update();
    });
  }
}

export { Firework };
