import { useEffect, useRef } from "react";

// Google-esque blue and tech colors seen in the video
const COLORS = [
  "#1a73e8",
  "#4285F4",
  "#8AB4F8",
  "#aecbfa",
  "#202124",
  "#e8eaed",
];

export default function AntigravityBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    let currentShapeIndex = 0;

    // Track mouse to add a subtle repel effect even while in shapes
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener("mouseout", () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    // Helper to generate target shapes
    const generateTargets = (shapeType, numParticles, width, height) => {
      const targets = [];
      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < numParticles; i++) {
        if (shapeType === "random") {
          targets.push({ x: Math.random() * width, y: Math.random() * height });
        } else if (shapeType === "circle") {
          const angle = (i / numParticles) * Math.PI * 2;
          const radius = height * 0.35 + (Math.random() * 40 - 20); // Slightly fuzzy circle
          targets.push({
            x: cx + Math.cos(angle) * radius,
            y: cy + Math.sin(angle) * radius,
          });
        } else if (shapeType === "brackets") {
          // Forms [ ] shapes
          const isLeft = i % 2 === 0;
          const bracketWidth = width * 0.15;
          const bracketHeight = height * 0.4;
          const spacing = width * 0.25;

          let bx, by;
          const progress = Math.random(); // 0 to 1 along the bracket line

          if (progress < 0.2) {
            // Top horizontal
            bx = isLeft
              ? cx - spacing - Math.random() * bracketWidth
              : cx + spacing + Math.random() * bracketWidth;
            by = cy - bracketHeight;
          } else if (progress > 0.8) {
            // Bottom horizontal
            bx = isLeft
              ? cx - spacing - Math.random() * bracketWidth
              : cx + spacing + Math.random() * bracketWidth;
            by = cy + bracketHeight;
          } else {
            // Vertical line
            bx = isLeft ? cx - spacing : cx + spacing;
            by =
              cy -
              bracketHeight +
              ((progress - 0.2) / 0.6) * (bracketHeight * 2);
          }

          // Add slight noise
          targets.push({
            x: bx + (Math.random() * 20 - 10),
            y: by + (Math.random() * 20 - 10),
          });
        }
      }
      return targets;
    };

    class Particle {
      constructor(index, total) {
        this.index = index;
        this.total = total;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.length = Math.random() * 6 + 3;
        this.thickness = Math.random() * 1.5 + 1;
        this.target = { x: this.x, y: this.y };
        this.rotation = 0;
      }

      setTarget(target) {
        this.target = target;
      }

      update(shapeType) {
        // Subtle mouse repel
        const dxMouse = mouse.x - this.x;
        const dyMouse = mouse.y - this.y;
        const distMouse = Math.hypot(dxMouse, dyMouse);
        let repelX = 0;
        let repelY = 0;

        if (distMouse < 150) {
          const force = (150 - distMouse) / 150;
          repelX = -(dxMouse / distMouse) * force * 5;
          repelY = -(dyMouse / distMouse) * force * 5;
        }

        if (shapeType === "random") {
          // Wander mode
          this.vx += (Math.random() - 0.5) * 0.2;
          this.vy += (Math.random() - 0.5) * 0.2;

          // Speed limits
          if (this.vx > 2) this.vx = 2;
          if (this.vx < -2) this.vx = -2;
          if (this.vy > 2) this.vy = 2;
          if (this.vy < -2) this.vy = -2;

          this.x += this.vx + repelX;
          this.y += this.vy + repelY;

          // Screen wrap
          if (this.x < 0) this.x = canvas.width;
          if (this.x > canvas.width) this.x = 0;
          if (this.y < 0) this.y = canvas.height;
          if (this.y > canvas.height) this.y = 0;
        } else {
          // Morph mode (Spring physics towards target)
          const dxTarget = this.target.x - this.x;
          const dyTarget = this.target.y - this.y;

          this.vx += dxTarget * 0.02; // Spring tension
          this.vy += dyTarget * 0.02;

          this.vx *= 0.85; // Friction
          this.vy *= 0.85;

          this.x += this.vx + repelX;
          this.y += this.vy + repelY;
        }

        // Rotate to match movement direction (gives that video dash look)
        this.rotation = Math.atan2(this.vy, this.vx);
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.lineWidth = this.thickness;
        ctx.strokeStyle = this.color;

        ctx.moveTo(-this.length / 2, 0);
        ctx.lineTo(this.length / 2, 0);
        ctx.stroke();

        ctx.restore();
      }
    }

    const initParticles = () => {
      particles = [];
      const numParticles = window.innerWidth > 768 ? 600 : 250;
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(i, numParticles));
      }
    };

    // Shape transition logic
    const shapes = ["random", "brackets", "random", "circle"];
    const changeShape = () => {
      currentShapeIndex = (currentShapeIndex + 1) % shapes.length;
      const newShape = shapes[currentShapeIndex];
      const targets = generateTargets(
        newShape,
        particles.length,
        canvas.width,
        canvas.height,
      );

      particles.forEach((p, i) => {
        if (newShape !== "random") p.setTarget(targets[i]);
      });
    };

    const shapeInterval = setInterval(changeShape, 4000);

    const animate = () => {
      // Clear with slight opacity for ultra-smooth movement trails
      const isDark = document.body.classList.contains("dark-mode");
      ctx.fillStyle = isDark
        ? "rgba(5, 5, 5, 0.4)"
        : "rgba(255, 255, 255, 0.4)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const currentShape = shapes[currentShapeIndex];
      particles.forEach((p) => {
        p.update(currentShape);
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", null);
      window.removeEventListener("mouseout", null);
      clearInterval(shapeInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
}
