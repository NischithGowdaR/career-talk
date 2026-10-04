"use client";

import React, { useEffect, useRef } from "react";

export default function FourDCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX / width;
      mouseRef.current.targetY = e.clientY / height;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // --- 4D HYPERCUBE (TESSERACT) VERTICES & EDGES ---
    // A 4D hypercube has 16 vertices: (±1, ±1, ±1, ±1)
    const vertices4D = [];
    for (let x = -1; x <= 1; x += 2) {
      for (let y = -1; y <= 1; y += 2) {
        for (let z = -1; z <= 1; z += 2) {
          for (let w = -1; w <= 1; w += 2) {
            vertices4D.push([x, y, z, w]);
          }
        }
      }
    }

    // Connect vertices that differ by only one coordinate (32 edges in a hypercube)
    const edges4D = [];
    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        let diff = 0;
        for (let k = 0; k < 4; k++) {
          if (vertices4D[i][k] !== vertices4D[j][k]) diff++;
        }
        if (diff === 1) {
          edges4D.push([i, j]);
        }
      }
    }

    // 4D Spatial Particles
    const particleCount = 75;
    const particles = Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * 1600,
      y: (Math.random() - 0.5) * 1200,
      z: Math.random() * 800 + 200,
      w: Math.random() * 400 - 200,
      radius: Math.random() * 2 + 1,
      speed: Math.random() * 0.8 + 0.3,
      color: Math.random() > 0.6 ? "#D4FF00" : Math.random() > 0.3 ? "#FF5722" : "#E024C3",
      pulse: Math.random() * Math.PI * 2,
    }));

    let angleZW = 0;
    let angleXY = 0;
    let angleXW = 0;
    let angleYZ = 0;

    const render = () => {
      // Smooth mouse interpolation for 4D camera rotation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const mX = (mouseRef.current.x - 0.5) * 2;
      const mY = (mouseRef.current.y - 0.5) * 2;

      angleZW += 0.012;
      angleXY += 0.008 + mX * 0.008;
      angleXW += 0.01 + mY * 0.008;
      angleYZ += 0.006;

      ctx.clearRect(0, 0, width, height);

      // Deep Volcanic Studio Gradient
      const bg = ctx.createRadialGradient(
        width * 0.5 + mX * 100,
        height * 0.4 + mY * 80,
        50,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.85
      );
      bg.addColorStop(0, "#131722");
      bg.addColorStop(0.5, "#0A0B0E");
      bg.addColorStop(1, "#050608");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // --- 4D HYPERCUBE ROTATION & PROJECTION ---
      // We project 4D (x,y,z,w) -> 3D (X,Y,Z) -> 2D (screenX, screenY)
      const cosZW = Math.cos(angleZW), sinZW = Math.sin(angleZW);
      const cosXY = Math.cos(angleXY), sinXY = Math.sin(angleXY);
      const cosXW = Math.cos(angleXW), sinXW = Math.sin(angleXW);
      const cosYZ = Math.cos(angleYZ), sinYZ = Math.sin(angleYZ);

      const tesseractScale = Math.min(width, height) * 0.28;
      const originX = width * 0.5 + mX * 60;
      const originY = height * 0.42 + mY * 40;

      const projectedVertices = vertices4D.map(([x0, y0, z0, w0]) => {
        // 4D Rotation in ZW plane
        let z1 = z0 * cosZW - w0 * sinZW;
        let w1 = z0 * sinZW + w0 * cosZW;

        // 4D Rotation in XW plane
        let x1 = x0 * cosXW - w1 * sinXW;
        let w2 = x0 * sinXW + w1 * cosXW;

        // 4D Rotation in XY plane
        let x2 = x1 * cosXY - y0 * sinXY;
        let y1 = x1 * sinXY + y0 * cosXY;

        // 4D Rotation in YZ plane
        let y2 = y1 * cosYZ - z1 * sinYZ;
        let z2 = y1 * sinYZ + z1 * cosYZ;

        // 4D to 3D perspective projection via W distance
        const distance4D = 2.4;
        const wFactor = 1 / (distance4D - w2 * 0.6);
        const X3D = x2 * wFactor * tesseractScale;
        const Y3D = y2 * wFactor * tesseractScale;
        const Z3D = z2 * wFactor * tesseractScale;

        // 3D to 2D screen projection
        const distance3D = 650;
        const zFactor = distance3D / (distance3D + Z3D);
        const screenX = originX + X3D * zFactor;
        const screenY = originY + Y3D * zFactor;

        return { x: screenX, y: screenY, z: Z3D, w: w2, factor: wFactor * zFactor };
      });

      // Draw 4D Hypercube Hologram Edges
      edges4D.forEach(([i, j]) => {
        const p1 = projectedVertices[i];
        const p2 = projectedVertices[j];

        const avgW = (p1.w + p2.w) * 0.5;
        const alpha = Math.max(0.08, Math.min(0.55, (avgW + 1.2) * 0.28));

        const edgeGrad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        edgeGrad.addColorStop(0, `rgba(212, 255, 0, ${alpha * 1.2})`);
        edgeGrad.addColorStop(0.5, `rgba(255, 87, 34, ${alpha * 0.9})`);
        edgeGrad.addColorStop(1, `rgba(224, 36, 195, ${alpha * 0.8})`);

        ctx.strokeStyle = edgeGrad;
        ctx.lineWidth = Math.max(0.8, p1.factor * 2.2);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw 4D Hypercube Vertex Quantum Nodes
      projectedVertices.forEach((p, idx) => {
        const radius = Math.max(1.5, p.factor * 4.5);
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 3);
        glow.addColorStop(0, idx % 2 === 0 ? "rgba(212, 255, 0, 0.9)" : "rgba(255, 87, 34, 0.9)");
        glow.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = idx % 2 === 0 ? "#D4FF00" : "#FF5722";
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // --- 4D FLOATING DEPTH PARTICLES ---
      particles.forEach((p) => {
        p.z -= p.speed * 1.5;
        p.pulse += 0.04;
        if (p.z < 50) {
          p.z = 800;
          p.x = (Math.random() - 0.5) * 1600;
          p.y = (Math.random() - 0.5) * 1200;
        }

        const pScale = 500 / p.z;
        const sx = width * 0.5 + p.x * pScale + mX * (1 - pScale) * 50;
        const sy = height * 0.5 + p.y * pScale + mY * (1 - pScale) * 50;
        const radius = Math.max(0.6, p.radius * pScale * (1 + Math.sin(p.pulse) * 0.3));

        if (sx > 0 && sx < width && sy > 0 && sy < height) {
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.min(0.7, pScale * 0.9);
          ctx.beginPath();
          ctx.arc(sx, sy, radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      });

      // --- 4D AUDIO FREQUENCY ENERGY WAVES AT BOTTOM ---
      const waveCount = 50;
      const barWidth = width / waveCount;
      const waveY = height * 0.92;

      for (let i = 0; i < waveCount; i++) {
        const bx = i * barWidth + barWidth * 0.5;
        const waveH =
          Math.sin(angleZW * 3 + i * 0.35) * 25 +
          Math.cos(angleXY * 2 + i * 0.25) * 20 +
          Math.sin(i * 0.5) * 15 +
          30;

        const grad = ctx.createLinearGradient(bx, waveY - waveH, bx, waveY + waveH);
        grad.addColorStop(0, "rgba(212, 255, 0, 0.45)");
        grad.addColorStop(0.5, "rgba(255, 87, 34, 0.35)");
        grad.addColorStop(1, "rgba(224, 36, 195, 0.1)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = Math.max(2, barWidth * 0.4);
        ctx.beginPath();
        ctx.moveTo(bx, waveY - waveH * 0.5);
        ctx.lineTo(bx, waveY + waveH * 0.5);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
