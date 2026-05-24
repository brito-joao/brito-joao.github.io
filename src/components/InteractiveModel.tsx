import { useEffect, useRef, useState, MouseEvent } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
  ox: number; // original coordinates for morphing
  oy: number;
  oz: number;
  color?: string;
  size?: number;
}

interface Connection {
  a: number;
  b: number;
  opacity: number;
}

export default function InteractiveModel({ activeSection }: { activeSection: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [pulse, setPulse] = useState(0); // For click pulse animation
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const pointsRef = useRef<Point3D[]>([]);
  const connectionsRef = useRef<Connection[]>([]);

  // Sound feedback on click (optional/silent) or interactive state
  const handleCanvasClick = (e: MouseEvent) => {
    setPulse(1.5);
    // Create random temporary offsets to make it "jolt" like an electric current
    pointsRef.current.forEach((p) => {
      const angle = Math.random() * Math.PI * 2;
      const strength = 100 + Math.random() * 120;
      p.x += Math.cos(angle) * strength;
      p.y += Math.sin(angle) * strength;
      p.z += (Math.random() - 0.5) * strength;
    });
  };

  // Generate the 3D structural model points
  useEffect(() => {
    const pts: Point3D[] = [];
    const conns: Connection[] = [];

    // --- Part A: Stylized Biometric Head / Bust structure ---
    // Let's create an elegant architectural bust shape
    // Vertices will represent forehead, nose, chin, cheeks, crown, ears
    const headFeatures = [
      // Forehead & Temple rings
      { name: "crown", r: 120, y: -160, steps: 12, offset: 0 },
      { name: "forehead", r: 100, y: -100, steps: 10, offset: 0.1 },
      { name: "eyebrow", r: 95, y: -50, steps: 10, offset: 0 },
      { name: "cheeks", r: 90, y: 0, steps: 8, offset: 0.2 },
      { name: "mouth", r: 60, y: 50, steps: 6, offset: 0 },
      { name: "chin", r: 35, y: 100, steps: 4, offset: 0.1 },
      { name: "neck", r: 40, y: 150, steps: 6, offset: 0 }
    ];

    let pointOffsetIndex = 0;
    headFeatures.forEach((layer) => {
      const startIndex = pts.length;
      for (let i = 0; i < layer.steps; i++) {
        const theta = (i / layer.steps) * Math.PI * 2 + layer.offset;
        // Introduce human profile variation (pull forward in +z to look like a face face)
        const isFacingForward = Math.cos(theta) > 0.2;
        const noseProj = isFacingForward && layer.name === "eyebrow" ? 1.4 : 1.0;
        const chinProj = isFacingForward && layer.name === "chin" ? 1.6 : 1.0;
        const zMultiplier = noseProj * chinProj;

        const x = Math.sin(theta) * layer.r;
        const z = Math.cos(theta) * layer.r * zMultiplier;
        const y = layer.y;

        pts.push({ x, y, z, ox: x, oy: y, oz: z });
      }
      const endIndex = pts.length;

      // Connect horizontal circle indices
      for (let i = startIndex; i < endIndex; i++) {
        const next = i === endIndex - 1 ? startIndex : i + 1;
        conns.push({ a: i, b: next, opacity: 0.3 });
      }
    });

    // Vertical structural connections between features
    let currentBase = 0;
    for (let f = 0; f < headFeatures.length - 1; f++) {
      const currentSteps = headFeatures[f].steps;
      const nextSteps = headFeatures[f + 1].steps;
      const nextBase = currentBase + currentSteps;

      for (let i = 0; i < currentSteps; i++) {
        // Find nearest horizontally aligned node in the next layer
        const ratio = i / currentSteps;
        const targetNextIndex = nextBase + Math.floor(ratio * nextSteps) % nextSteps;
        conns.push({ a: currentBase + i, b: targetNextIndex, opacity: 0.4 });
      }
      currentBase += currentSteps;
    }

    // --- Part B: Electrical & Spiritual Orbiting Systems ---
    // Let's add multiple glowing orbital circuits ring / dual halo (Faith / Spiritual / Discipline alignment)
    const orbitPointsStart = pts.length;
    const ringRadius = 180;
    
    // Horizontal Ring
    for (let i = 0; i < 24; i++) {
      const theta = (i / 24) * Math.PI * 2;
      const x = Math.sin(theta) * ringRadius;
      const z = Math.cos(theta) * ringRadius;
      pts.push({ x, y: -20, z, ox: x, oy: -20, oz: z, color: "#38bdf8", size: 3 });
    }
    for (let i = 0; i < 24; i++) {
      const next = i === 23 ? 0 : i + 1;
      conns.push({ a: orbitPointsStart + i, b: orbitPointsStart + next, opacity: 0.6 });
    }

    // Vertical Aura Ring (Halo signifying Faith & street ministry foundation)
    const vertOrbitStart = pts.length;
    for (let i = 0; i < 16; i++) {
      const theta = (i / 16) * Math.PI * 2;
      const y = Math.sin(theta) * (ringRadius + 20) - 20;
      const z = Math.cos(theta) * (ringRadius + 20);
      pts.push({ x: 0, y, z, ox: 0, oy: y, oz: z, color: "#e0f2fe", size: 4 });
    }
    for (let i = 0; i < 16; i++) {
      const next = i === 15 ? 0 : i + 1;
      conns.push({ a: vertOrbitStart + i, b: vertOrbitStart + next, opacity: 0.7 });
    }

    // Save references
    pointsRef.current = pts;
    connectionsRef.current = conns;
  }, []);

  // Track cursor coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      
      // Target velocities based on relative cursor offset
      mouseRef.current.tx = (e.clientX - cx) / (rect.width / 2);
      mouseRef.current.ty = (e.clientY - cy) / (rect.height / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Update loop for physics, rotating and rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let localRot = { x: 0.1, y: 0.5, z: 0 };

    const render = () => {
      if (!canvas || !ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Interpolate mouse dampening for ultra smooth look (cinematic response)
      mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.05;

      // Base rotation speeds + cursor bias
      localRot.y += 0.004 + (mouseRef.current.x * 0.03);
      localRot.x += 0.001 - (mouseRef.current.y * 0.02);
      localRot.z += 0.0005;

      // Scroll morph effects: morph original coordinates based on section!
      let sectionColor = "#111111";
      let particleSizeMultiplier = 1.0;
      let connectionColor = "rgba(0, 0, 0, 0.10)";
      
      pointsRef.current.forEach((pt) => {
        // Return to original coordinates after click explosion (spring physics)
        const dx = pt.ox - pt.x;
        const dy = pt.oy - pt.y;
        const dz = pt.oz - pt.z;
        pt.x += dx * 0.08;
        pt.y += dy * 0.08;
        pt.z += dz * 0.08;

        // Custom morph metrics based on section to show extreme skill!
        if (activeSection === "builder") {
          // Engineering: Grid coordinates aligned slightly to virtual motherboard cubes
          sectionColor = "#34d399"; // emerald
          connectionColor = "rgba(52, 211, 153, 0.18)";
        } else if (activeSection === "foundation") {
          // Faith: expand and breathe the shape outward like energy/auras
          const dist = Math.sqrt(pt.ox * pt.ox + pt.oy * pt.oy + pt.oz * pt.oz);
          const expansion = Math.sin(Date.now() * 0.003 + dist * 0.01) * 12;
          pt.x += (pt.ox / dist) * expansion;
          pt.y += (pt.oy / dist) * expansion;
          pt.z += (pt.oz / dist) * expansion;
          sectionColor = "#60a5fa"; // sky blue / divine blue
          connectionColor = "rgba(96, 165, 250, 0.18)";
        } else if (activeSection === "discipline") {
          // Fitness / Benchpress: condense, tight, heavy vibrating steel structure
          const frequency = Math.sin(Date.now() * 0.02) * 2;
          pt.x += (Math.random() - 0.5) * frequency;
          pt.y += (Math.random() - 0.5) * frequency;
          pt.z += (Math.random() - 0.5) * frequency;
          sectionColor = "#f87171"; // deep red core
          connectionColor = "rgba(248, 113, 113, 0.22)";
          particleSizeMultiplier = 1.5;
        } else if (activeSection === "invitation") {
          // Invitation: shimmering stars merging in
          sectionColor = "#f59e0b"; // gold
          connectionColor = "rgba(245, 158, 11, 0.2)";
        }
      });

      // Pulse trigger decay
      if (pulse > 0) setPulse(pulse - 0.05);

      // Centers
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const fov = 350; // Dynamic zoom
      
      // Project 3D to 2D
      const projected = pointsRef.current.map((pt) => {
        // Apply Y rotation
        let x1 = pt.x * Math.cos(localRot.y) - pt.z * Math.sin(localRot.y);
        let z1 = pt.x * Math.sin(localRot.y) + pt.z * Math.cos(localRot.y);
        
        // Apply X rotation
        let y2 = pt.y * Math.cos(localRot.x) - z1 * Math.sin(localRot.x);
        let z2 = pt.y * Math.sin(localRot.x) + z1 * Math.cos(localRot.x);
        
        // Apply Z rotation
        let x3 = x1 * Math.cos(localRot.z) - y2 * Math.sin(localRot.z);
        let y3 = x1 * Math.sin(localRot.z) + y2 * Math.cos(localRot.z);

        // Perspective Projection calculation
        const distance = 400; // view distance
        const scale = fov / (distance - z2);
        
        return {
          px: cx + x3 * scale,
          py: cy + y3 * scale,
          pz: z2,
          visible: (distance - z2) > 10,
          originalColor: pt.color,
          customSize: pt.size
        };
      });

      // Draw Connections (lines) with Z-buffer depth fading
      connectionsRef.current.forEach((conn) => {
        const p1 = projected[conn.a];
        const p2 = projected[conn.b];

        if (p1?.visible && p2?.visible) {
          // Basic depth calculation: fade line opacity if points are in background (Z < 0)
          const avgZ = (p1.pz + p2.pz) / 2;
          const normalizedZ = (avgZ + 180) / 360; // 0 to 1 range approx
          const alphaFactor = Math.max(0.1, Math.min(0.9, normalizedZ));

          ctx.beginPath();
          ctx.moveTo(p1.px, p2.py); // Classic mesh triangulation overlay
          ctx.lineTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
          ctx.strokeStyle = connectionColor.replace(/[\d.]+\)$/, `${conn.opacity * alphaFactor})`);
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      });

      // Draw Nodes (dots) with glowing effect for highlights
      projected.forEach((node) => {
        if (!node.visible) return;

        // Custom highlight node styles
        const avgZ = node.pz;
        const normalizedZ = (avgZ + 180) / 360; // 0 to 1 range
        const alpha = Math.max(0.15, Math.min(1.0, normalizedZ));
        const finalSize = (node.customSize || 1.8) * Math.max(0.6, normalizedZ) * particleSizeMultiplier;

        ctx.beginPath();
        ctx.arc(node.px, node.py, finalSize, 0, Math.PI * 2);
        ctx.fillStyle = node.originalColor || sectionColor;
        ctx.shadowColor = node.originalColor || sectionColor;
        ctx.shadowBlur = activeSection === "foundation" ? 8 : 2; // glow aura
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0; // reset
      });

      // Render aesthetic overlay details (Tech grid elements overlay)
      ctx.font = "10px JetBrains Mono, monospace";
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.fillText(`ROT.Y: ${localRot.y.toFixed(2)}`, 20, canvas.height - 40);
      ctx.fillText(`ROT.X: ${localRot.x.toFixed(2)}`, 20, canvas.height - 25);
      ctx.fillText(`NÓDOS ATIVOS: ${pointsRef.current.length}`, 20, canvas.height - 10);

      // Simple scanning geometric overlay in corner
      ctx.beginPath();
      ctx.rect(canvas.width - 35, canvas.height - 35, 15, 15);
      ctx.strokeStyle = "rgba(0, 0, 0, 0.12)";
      ctx.stroke();
      if (Math.random() > 0.4) {
        ctx.fillStyle = sectionColor;
        ctx.fillRect(canvas.width - 31, canvas.height - 31, 7, 7);
      }

      animId = requestAnimationFrame(render);
    };

    // Responsive Resize Observer support
    const handleResize = () => {
      if (!containerRef.current) return;
      canvas.width = containerRef.current.clientWidth;
      canvas.height = Math.max(500, containerRef.current.clientHeight);
    };
    
    // Initial resize trigger
    handleResize();
    const ro = new ResizeObserver(handleResize);
    ro.observe(containerRef.current);

    render();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [activeSection, pulse]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative flex items-center justify-center cursor-pointer select-none group"
      onClick={handleCanvasClick}
      title="Clica para propagar um impulso de energia pelo modelo"
    >
      <canvas ref={canvasRef} className="absolute inset-0 block z-10" />
      
      {/* Absolute micro layout detail framing */}
      <div className="absolute top-10 right-10 flex flex-col items-end gap-1.5 font-mono text-[9px] text-muted-foreground/55 tracking-widest hidden md:flex">
        <span>ESPETRO COORD MATRIZ</span>
        <span className="text-stone-900/40 group-hover:text-stone-900/70 transition-colors">TOQUE PARA GERAR IMPULSO</span>
      </div>
      
      {/* Glass orb shadow behind representation */}
      <div className="absolute w-[280px] h-[280px] bg-black/2 rounded-full border border-black/5 filter blur-xs animate-pulse hidden md:block" />
    </div>
  );
}
