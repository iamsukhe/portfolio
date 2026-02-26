import { useEffect, useRef } from "react";

// Tech-focused palette: sleek blues, AI-purples, and node grays
const COLORS = [
  "#1a73e8", // Google Blue
  "#8AB4F8", // Light Blue
  "#9333ea", // AI Purple
  "#3b82f6", // Cyan/Blue
  "#64748b", // Slate
];

export default function AntigravityBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];

    // Track mouse to act as a central "data processor" node
    let mouse = { x: -1000, y: -1000, radius: 150 };

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

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // Slower, more deliberate movement representing data flow
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.radius = Math.random() * 2 + 1;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      }

      update() {
        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

        this.x += this.vx;
        this.y += this.vy;

        // Mouse interaction: slight gravitational pull towards the mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          // Very gentle pull
          const force = (mouse.radius - distance) / mouse.radius;
          this.x += forceDirectionX * force * 0.5;
          this.y += forceDirectionY * force * 0.5;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      // Adjust particle count based on screen size to maintain performance (O(n^2) complexity for lines)
      const numParticles = window.innerWidth > 768 ? 120 : 60;
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      // Clear the canvas completely so it relies on the CSS background color of the parent wrapper
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Check for dark mode to adjust line opacity/color
      const isDark = document.body.classList.contains("dark-mode");
      const lineBaseColor = isDark ? "138, 180, 248" : "26, 115, 232"; // Light blue vs Deep blue

      // Update and draw particles, plus draw neural network connections
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect particles to each other
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            // Opacity fades out the further away the particles are
            const opacity = 1 - distance / 120;
            ctx.strokeStyle = `rgba(${lineBaseColor}, ${opacity * 0.5})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Connect particles to the mouse (user acts as an active node)
        const dxMouse = particles[i].x - mouse.x;
        const dyMouse = particles[i].y - mouse.y;
        const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distanceMouse < mouse.radius) {
          ctx.beginPath();
          const opacity = 1 - distanceMouse / mouse.radius;
          ctx.strokeStyle = `rgba(${lineBaseColor}, ${opacity * 0.8})`;
          ctx.lineWidth = 1.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", null);
      window.removeEventListener("mouseout", null);
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
        // Smooth transition when switching dark/light modes
        transition: "background-color 0.3s ease",
      }}
    />
  );
}
