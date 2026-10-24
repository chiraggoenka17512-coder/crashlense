"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

import { SITE_CONFIG } from "@/config/site-config";

interface DeviceModelCanvasProps {
  isFlipped?: boolean;
  onFlipToggle?: () => void;
  interactive?: boolean;
  className?: string;
  problemTitle?: string;
  problemCategory?: string;
}

export function DeviceModelCanvas({
  isFlipped = false,
  onFlipToggle,
  interactive = true,
  className = "",
  problemTitle = SITE_CONFIG.problemStatement.title,
  problemCategory = SITE_CONFIG.problemStatement.category,
}: DeviceModelCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const screenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const screenTextureRef = useRef<THREE.CanvasTexture | null>(null);

  const [modelType, setModelType] = useState<"glb" | "procedural">("procedural");

  // References for Three.js scene graph
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rootGroupRef = useRef<THREE.Group | null>(null);
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Update dynamic 2D canvas texture for OLED screen
  const updateScreenCanvas = useCallback(() => {
    if (!screenCanvasRef.current) return;
    const ctx = screenCanvasRef.current.getContext("2d");
    if (!ctx) return;

    const w = screenCanvasRef.current.width;
    const h = screenCanvasRef.current.height;

    // Background Pitch Noir
    ctx.fillStyle = "#07080c";
    ctx.fillRect(0, 0, w, h);

    // Subtle grid background
    ctx.strokeStyle = "rgba(255, 237, 214, 0.05)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Dynamic Island / Top Bezel Notch
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.roundRect(w / 2 - 80, 24, 160, 36, 18);
    ctx.fill();

    // Island Camera lens reflection
    ctx.fillStyle = "#0c1726";
    ctx.beginPath();
    ctx.arc(w / 2 + 45, 42, 6, 0, Math.PI * 2);
    ctx.fill();

    // Top Status Bar
    ctx.fillStyle = "#94a3b8";
    ctx.font = "bold 20px monospace";
    ctx.fillText("09:41", 44, 48);

    // Signal / Battery Indicators
    ctx.textAlign = "right";
    ctx.fillText("5G  100%", w - 44, 48);
    ctx.textAlign = "left";

    // Header Accent Banner
    ctx.fillStyle = "#f59e0b";
    ctx.font = "bold 16px monospace";
    ctx.fillText("ORCATHON 2026 // WEAPON-GRADE OS", 44, 110);

    // Live Telemetry Dot
    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.arc(w - 50, 105, 5, 0, Math.PI * 2);
    ctx.fill();

    // Track Category Pill
    ctx.fillStyle = "rgba(255, 237, 214, 0.12)";
    ctx.beginPath();
    ctx.roundRect(44, 130, 220, 32, 6);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 237, 214, 0.25)";
    ctx.stroke();

    ctx.fillStyle = "#ffedd6";
    ctx.font = "600 13px monospace";
    ctx.fillText(`TRACK: ${problemCategory.toUpperCase()}`, 56, 151);

    // Main Problem Statement Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 36px sans-serif";
    const words = problemTitle.split(" ");
    let line1 = "";
    let line2 = "";
    if (words.length > 2) {
      line1 = words.slice(0, 2).join(" ");
      line2 = words.slice(2).join(" ");
    } else {
      line1 = problemTitle;
    }
    ctx.fillText(line1, 44, 220);
    if (line2) {
      ctx.fillText(line2, 44, 265);
    }

    // App HUD Container Card
    ctx.fillStyle = "rgba(18, 20, 29, 0.9)";
    ctx.strokeStyle = "rgba(255, 237, 214, 0.15)";
    ctx.beginPath();
    ctx.roundRect(36, 310, w - 72, 340, 16);
    ctx.fill();
    ctx.stroke();

    // Internal Terminal Title
    ctx.fillStyle = "#64748b";
    ctx.font = "600 14px monospace";
    ctx.fillText("ENGINE LOG // CLERK + SUPABASE + REDIS", 54, 340);

    // Live Metrics Bar Inside Screen
    const metrics = [
      { label: "POSTGRES PING", val: "12ms", color: "#10b981" },
      { label: "CACHE HIT", val: "99.4%", color: "#38bdf8" },
      { label: "RATE LIMIT", val: "PASS", color: "#f59e0b" },
    ];

    metrics.forEach((m, idx) => {
      const x = 54 + idx * 145;
      ctx.fillStyle = "rgba(255,255,255,0.04)";
      ctx.beginPath();
      ctx.roundRect(x, 360, 135, 65, 8);
      ctx.fill();

      ctx.fillStyle = "#94a3b8";
      ctx.font = "11px monospace";
      ctx.fillText(m.label, x + 10, 382);

      ctx.fillStyle = m.color;
      ctx.font = "bold 20px monospace";
      ctx.fillText(m.val, x + 10, 412);
    });

    // Simulated Code Snippet
    ctx.fillStyle = "#334155";
    ctx.font = "13px monospace";
    ctx.fillText("const orcaEngine = await initStack();", 54, 460);
    ctx.fillText("orcaEngine.dispatch({ telemetry: true });", 54, 485);
    ctx.fillText("=> Core pipeline locked at 60 FPS", 54, 510);

    // Waveform / Signal Canvas inside phone
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2;
    ctx.beginPath();
    const startY = 560;
    ctx.moveTo(54, startY);
    for (let i = 0; i < 400; i += 10) {
      const wave = Math.sin(i * 0.05 + Date.now() * 0.005) * 15;
      ctx.lineTo(54 + i, startY + wave);
    }
    ctx.stroke();

    // Primary CTA Button inside Phone
    ctx.fillStyle = "#ffedd6";
    ctx.beginPath();
    ctx.roundRect(36, 680, w - 72, 54, 12);
    ctx.fill();

    ctx.fillStyle = "#08090d";
    ctx.font = "bold 18px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("RESOLVE STATEMENT →", w / 2, 714);
    ctx.textAlign = "left";

    // Bottom iOS Home Indicator Bar
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.roundRect(w / 2 - 70, h - 18, 140, 5, 2.5);
    ctx.fill();

    if (screenTextureRef.current) {
      screenTextureRef.current.needsUpdate = true;
    }
  }, [problemTitle, problemCategory]);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.8);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;

    // 2. High-End Studio Lighting (Matching Oryzo.ai Dark Slate / Warm Gold Look)
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 0.8);
    scene.add(ambientLight);

    // Warm Key Light (top-left)
    const keyLight = new THREE.DirectionalLight(0xffedd6, 2.8);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    // Cyan Fill / Rim Light (bottom-right)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.6);
    rimLight.position.set(-3, -2, -2);
    scene.add(rimLight);

    // Subtle Softbox Overhead
    if (typeof THREE.RectAreaLight === "function") {
      const softbox = new THREE.RectAreaLight(0xffffff, 2, 2, 2);
      softbox.position.set(0, 3, 2);
      scene.add(softbox);
    }

    // 3. Dynamic Screen Texture Setup
    const screenCanvas = document.createElement("canvas");
    screenCanvas.width = 512;
    screenCanvas.height = 1050; // Modern ~19.5:9 smartphone ratio
    screenCanvasRef.current = screenCanvas;

    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.flipY = false;
    screenTexture.generateMipmaps = true;
    screenTexture.minFilter = THREE.LinearMipmapLinearFilter;
    screenTextureRef.current = screenTexture;

    updateScreenCanvas();

    // 4. Root Device Group at (0, 0, 0)
    const rootDevice = new THREE.Group();
    rootDevice.name = "Root_Device";
    scene.add(rootDevice);
    rootGroupRef.current = rootDevice;

    // Helper: Build Procedural Fallback Device (Exact dimensions from brief: 1.50 h, 0.72 w, 0.08 d)
    const createProceduralDevice = () => {
      const devWidth = 0.72;
      const devHeight = 1.5;
      const devDepth = 0.08;

      // A. Chassis Frame (Dark Titanium #1A1B22, Metallic: 0.95, Roughness: 0.22)
      const chassisMat = new THREE.MeshStandardMaterial({
        color: 0x1a1b22,
        metalness: 0.95,
        roughness: 0.22,
      });

      // Outer phone box with bevel
      const chassisGeom = new THREE.BoxGeometry(devWidth, devHeight, devDepth);
      const chassisMesh = new THREE.Mesh(chassisGeom, chassisMat);
      chassisMesh.name = "Chassis_Frame";
      rootDevice.add(chassisMesh);

      // B. Back Plate (Deep Obsidian #0E0F14, Metallic: 0.10, Roughness: 0.55)
      const backMat = new THREE.MeshStandardMaterial({
        color: 0x0e0f14,
        metalness: 0.1,
        roughness: 0.55,
      });
      const backGeom = new THREE.PlaneGeometry(devWidth - 0.02, devHeight - 0.02);
      const backMesh = new THREE.Mesh(backGeom, backMat);
      backMesh.name = "Back_Plate";
      backMesh.rotation.y = Math.PI;
      backMesh.position.z = -(devDepth / 2 + 0.001);
      rootDevice.add(backMesh);

      // C. Rear Camera Island (Polished Glass Plateau with Beveled Rings)
      const cameraIslandGroup = new THREE.Group();
      cameraIslandGroup.name = "Camera_Island";
      cameraIslandGroup.position.set(-0.16, 0.44, -(devDepth / 2 + 0.008));
      cameraIslandGroup.rotation.y = Math.PI;

      // Plateau Base
      const plateauMat = new THREE.MeshStandardMaterial({
        color: 0x0a0b0e,
        metalness: 0.2,
        roughness: 0.08,
      });
      const plateau = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.36, 0.015), plateauMat);
      cameraIslandGroup.add(plateau);

      // Triple Camera Lenses
      const lensMat = new THREE.MeshStandardMaterial({
        color: 0x030305,
        metalness: 0.9,
        roughness: 0.05,
      });
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0x2b2e3b,
        metalness: 0.95,
        roughness: 0.2,
      });

      const lensCoords = [
        [-0.07, 0.08],
        [-0.07, -0.08],
        [0.07, 0.0],
      ];

      lensCoords.forEach(([lx, ly]) => {
        const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.018, 24), ringMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.set(lx, ly, 0.01);

        const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.02, 24), lensMat);
        lens.rotation.x = Math.PI / 2;
        lens.position.set(lx, ly, 0.012);

        cameraIslandGroup.add(ring);
        cameraIslandGroup.add(lens);
      });

      rootDevice.add(cameraIslandGroup);

      // D. Screen OLED Polygon (Receives dynamic UI canvas)
      const screenMat = new THREE.MeshBasicMaterial({
        map: screenTexture,
        toneMapped: false,
      });
      const screenGeom = new THREE.PlaneGeometry(devWidth - 0.03, devHeight - 0.03);
      const screenMesh = new THREE.Mesh(screenGeom, screenMat);
      screenMesh.name = "Screen_OLED";
      screenMesh.position.z = devDepth / 2 + 0.001;
      rootDevice.add(screenMesh);

      // E. Screen Glass Cover (Clear Coat Fresnel sheen)
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.05,
        roughness: 0.04,
        transmission: 0.85,
        transparent: true,
        opacity: 0.45,
        reflectivity: 0.9,
      });
      const glassGeom = new THREE.PlaneGeometry(devWidth - 0.01, devHeight - 0.01);
      const glassMesh = new THREE.Mesh(glassGeom, glassMat);
      glassMesh.name = "Screen_Glass_Cover";
      glassMesh.position.z = devDepth / 2 + 0.003;
      rootDevice.add(glassMesh);

      setModelType("procedural");
    };

    // 5. Attempt loading official exported GLB if available, else use procedural model
    const gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/");
    gltfLoader.setDRACOLoader(dracoLoader);

    gltfLoader.load(
      "/models/orcathon_device.glb",
      (gltf) => {
        // Authentic Apple 3D model loaded successfully!
        const model = gltf.scene;
        model.rotation.x = Math.PI / 2;
        model.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child.name === "Screen_OLED" || child.name.toLowerCase().includes("screen")) {
              child.material = new THREE.MeshBasicMaterial({
                map: screenTexture,
                toneMapped: false,
              });
            } else if (child.name === "Screen_Glass_Cover") {
              child.material = new THREE.MeshPhysicalMaterial({
                color: 0xffffff,
                metalness: 0.05,
                roughness: 0.04,
                transmission: 0.92,
                transparent: true,
                opacity: 0.3,
                reflectivity: 0.9,
              });
            }
          }
        });
        rootDevice.add(model);
        setModelType("glb");
      },
      undefined,
      (err) => {
        console.error("GLTF load error, falling back to procedural:", err);
        createProceduralDevice();
      }
    );

    // 6. Animation Loop (Smooth Lerping + 60 FPS Lock)
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Dynamic waveform/pulse updates on screen
      if (clock.getElapsedTime() > 0.05) {
        updateScreenCanvas();
        clock.start();
      }

      if (rootGroupRef.current) {
        // Target flip rotation (0 rad for front, Math.PI rad for back)
        const targetFlipAngle = isFlipped ? Math.PI : 0;
        const currentY = rootGroupRef.current.rotation.y;

        // Smooth spring dampening toward target rotation
        rootGroupRef.current.rotation.y +=
          (targetFlipAngle + targetRotationRef.current.y - currentY) * 0.08;
        rootGroupRef.current.rotation.x +=
          (targetRotationRef.current.x - rootGroupRef.current.rotation.x) * 0.08;

        // Subtle floating idle motion
        rootGroupRef.current.position.y = Math.sin(Date.now() * 0.0015) * 0.03;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // 7. Resize Observer
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const newW = containerRef.current.clientWidth;
      const newH = containerRef.current.clientHeight;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      dracoLoader.dispose();
    };
  }, [isFlipped, updateScreenCanvas]);

  // Mouse Parallax & Interactive Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!interactive) return;
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!interactive) return;

    if (isDraggingRef.current) {
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      targetRotationRef.current.y += deltaX * 0.008;
      targetRotationRef.current.x += deltaY * 0.008;

      // Clamp X tilt to prevent inverted tumbling
      targetRotationRef.current.x = Math.max(-0.4, Math.min(0.4, targetRotationRef.current.x));

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    } else if (containerRef.current) {
      // Gentle parallax when not dragging
      const rect = containerRef.current.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      targetRotationRef.current.y = nx * 0.45;
      targetRotationRef.current.x = ny * 0.35;
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none ${className}`}
    >
      {/* Three.js Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* CAD Vector Reticle / Caliper Overlays */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 font-mono text-[10px] text-neutral-400">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5 bg-black/60 px-2 py-0.5 rounded border border-white/10 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>RENDER: {modelType === "glb" ? "GLTF/GLB PBR" : "PROCEDURAL TITANIUM"}</span>
          </div>
          <div className="bg-black/60 px-2 py-0.5 rounded border border-white/10 backdrop-blur-sm">
            <span>SCALE: 1.50 × 0.72 × 0.08m</span>
          </div>
        </div>

        {/* Center Crosshairs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/5 rounded-full flex items-center justify-center pointer-events-none">
          <div className="w-2 h-2 border-t border-l border-amber-400/50 absolute top-0 left-0" />
          <div className="w-2 h-2 border-t border-r border-amber-400/50 absolute top-0 right-0" />
          <div className="w-2 h-2 border-b border-l border-amber-400/50 absolute bottom-0 left-0" />
          <div className="w-2 h-2 border-b border-r border-amber-400/50 absolute bottom-0 right-0" />
        </div>

        {/* Bottom Coordinates HUD */}
        <div className="flex justify-between items-end">
          <div className="bg-black/60 px-2.5 py-1 rounded border border-white/10 backdrop-blur-sm">
            <span>ROTATION: {isFlipped ? "180° REVERSE" : "0° FRONT VIEW"}</span>
          </div>
          {onFlipToggle && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFlipToggle();
              }}
              className="pointer-events-auto px-3 py-1.5 rounded bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-mono transition-all shadow-[0_0_15px_rgba(245,158,11,0.15)] flex items-center gap-1.5"
            >
              <span>FLIP DEVICE ↺</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
