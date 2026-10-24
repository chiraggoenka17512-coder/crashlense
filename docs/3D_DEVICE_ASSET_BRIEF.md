# 📱 3D ASSET BRIEF: ORCATHON 2026 WEAPON-GRADE DEVICE MODEL

### 🎯 Objective
Create a photorealistic, luxury 3D smartphone/device model (inspired by Apple iPhone 16 Pro / Teenage Engineering industrial minimalism) optimized for real-time WebGL rendering in Next.js 16 via Three.js / React Three Fiber. 

The device will serve as the central visual centerpiece on an Awwwards-caliber landing page (benchmarked against Oryzo.ai).

---

## 🛠️ 1. SOFTWARE & TARGET TECH STACK
* **Primary 3D Modeling Software**: Blender 4.x (or Maya / Cinema4D).
* **Target Web Engine**: Three.js / React Three Fiber (`@react-three/fiber` + `@react-three/drei` or Three.js WebGLRenderer).
* **Coding Language**: TypeScript.
* **Final Export Format**: Binary GLTF (`.glb`).

---

## 📐 2. MODEL GEOMETRY & BUDGET CONSTRAINTS
* **Polygon Budget**: Maximum **20,000 to 35,000 triangles** (clean, quad-dominant topology with bevels, no excessive sub-surf modifier baking).
* **Dimensions / Scale**: Centered at origin `(0, 0, 0)`.
  * Height: `1.50` units
  * Width: `0.72` units
  * Thickness: `0.08` units
  * Screen Aspect Ratio: Modern `19.5:9` edge-to-edge bezel with subtle rounded corners.
* **File Size Constraint**: Final compressed `.glb` MUST be **under 2.5 MB** (use Draco compression or optimize texture maps).

---

## 🧱 3. MANDATORY NODE HIERARCHY & MESH NAMES
The Three.js developer must be able to traverse the model in code and manipulate specific parts. You **MUST** name the mesh objects exactly as follows:

```
Root_Device (Empty / Group at 0,0,0)
│
├── Chassis_Frame       --> Metal side-band, volume buttons, USB-C port, speaker grills
├── Back_Plate          --> Rear frosted ceramic/matte glass
├── Camera_Island       --> Rear camera bump, metal rings, and sapphire lens caps
├── Screen_OLED         --> [CRITICAL] The flat OLED display polygon (receives dynamic UI canvas)
└── Screen_Glass_Cover  --> Thin 0.002-offset transparent glass layer for reflections
```

---

## 🗺️ 4. UV MAPPING RULES (MOST CRITICAL STEP)

### The `Screen_OLED` Mesh UV:
* The `Screen_OLED` mesh **MUST have dedicated, non-overlapping UVs spanning exactly `(U: 0.0 -> 1.0, V: 0.0 -> 1.0)`**.
* **Zero distortion or rotation**: UV `(0, 1)` must correspond to top-left of the screen; `(1, 0)` must correspond to bottom-right.
* **Why**: The frontend code will dynamically inject a live HTML5 Canvas / Next.js app texture onto this mesh at runtime (`texture.flipY = false`). If the UV is inverted or sheared, the app UI will appear upside-down or stretched.

---

## 🎨 5. PBR MATERIAL SPECIFICATIONS (ROUGHNESS / METALLIC WORKFLOW)

All materials must use standard **Principled BSDF (glTF 2.0 PBR)** with textures packed directly into the `.glb`:

| Mesh Name | Base Color | Metallic | Roughness | Transmission / Alpha | Visual Effect |
| :--- | :--- | :---: | :---: | :---: | :--- |
| `Chassis_Frame` | `#1A1B22` (Dark Titanium) | `0.95` | `0.22` | `0.0` | Subtle anisotropic brushed metal; catches soft rim light |
| `Back_Plate` | `#0E0F14` (Deep Obsidian) | `0.10` | `0.55` | `0.0` | Silky frosted matte finish with ambient occlusion |
| `Camera_Island` | `#0A0B0E` (Polished Glass) | `0.20` | `0.08` | `0.0` | Glossy mirror-like plateau with metal bevel rings |
| `Screen_OLED` | `#000000` (Emissive Capable) | `0.00` | `0.90` | `0.0` | Default placeholder black screen before code texture is applied |
| `Screen_Glass_Cover`| `#FFFFFF` (Clear Coat) | `0.05` | `0.04` | `0.85` (Alpha) | High-Fresnel glass sheen; catches studio softbox sweep |

* **Texture Resolutions**: Max `2048x2048` for Normal and Roughness/Metalness maps (saved as WebP or optimized PNGs).

---

## 📦 6. EXPORT SETTINGS IN BLENDER
When exporting to `.glb`:
1. Format: `glTF Binary (.glb)`
2. Include: Selected Objects only (`Root_Device` hierarchy)
3. Transform: `+Y Up`
4. Geometry: Apply Modifiers: `Checked`
5. Materials: Export Materials: `Checked`, Images: `Automatic`
6. Compression: Enable `Google Draco compression` (Level 7) to keep file under 2MB.

---

## 💻 7. CODE INTEGRATION SNIPPET (HOW THE DEVELOPER WILL USE IT)
Give your friend this TypeScript / Three.js snippet so they can see how their exported model will be mounted in code:

```tsx
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function DeviceModel({ dynamicCanvasTexture }: { dynamicCanvasTexture: THREE.CanvasTexture }) {
  // Load the exported GLB model
  const { nodes, materials } = useGLTF("/models/orcathon_device.glb") as any;

  // Apply dynamic Next.js UI canvas texture directly to the screen mesh
  if (nodes.Screen_OLED && dynamicCanvasTexture) {
    nodes.Screen_OLED.material = new THREE.MeshBasicMaterial({
      map: dynamicCanvasTexture,
      toneMapped: false,
    });
  }

  return (
    <group dispose={null}>
      {/* Chassis Frame with Brushed Titanium */}
      <mesh geometry={nodes.Chassis_Frame.geometry} material={materials.Chassis_Frame} />
      
      {/* Matte Frosted Back Plate */}
      <mesh geometry={nodes.Back_Plate.geometry} material={materials.Back_Plate} />
      
      {/* Dynamic Screen Mesh */}
      <mesh geometry={nodes.Screen_OLED.geometry} material={nodes.Screen_OLED.material} />
      
      {/* Glass Overlay with Fresnel Sheen */}
      <mesh geometry={nodes.Screen_Glass_Cover.geometry} material={materials.Screen_Glass_Cover} />
    </group>
  );
}

useGLTF.preload("/models/orcathon_device.glb");
```

---

## 📋 8. FINAL DELIVERABLE CHECKLIST FOR ARTIST
- [ ] File named: `orcathon_device.glb`
- [ ] File size is under `2.5 MB`
- [ ] Model is centered at `(0, 0, 0)` with realistic dimensions
- [ ] Mesh hierarchy strictly matches: `Chassis_Frame`, `Back_Plate`, `Screen_OLED`, `Screen_Glass_Cover`
- [ ] `Screen_OLED` has clean non-inverted UV `(0,0)` to `(1,1)` mapping
- [ ] Materials look photorealistic under standard Three.js studio HDRI lighting
