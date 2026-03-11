import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// TouchTexture class mapped from the vanilla JS code
class TouchTexture {
  size: number;
  width: number;
  height: number;
  maxAge: number;
  radius: number;
  speed: number;
  trail: any[];
  last: any;
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  texture!: THREE.Texture;

  constructor() {
    this.size = 64;
    this.width = this.height = this.size;
    this.maxAge = 64;
    this.radius = 0.25 * this.size;
    this.speed = 1 / this.maxAge;
    this.trail = [];
    this.last = null;
    this.initTexture();
  }

  initTexture() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext("2d")!;
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.texture = new THREE.CanvasTexture(this.canvas);
  }

  update() {
    this.clear();
    const speed = this.speed;
    for (let i = this.trail.length - 1; i >= 0; i--) {
      const point = this.trail[i];
      const f = point.force * speed * (1 - point.age / this.maxAge);
      point.x += point.vx * f;
      point.y += point.vy * f;
      point.age++;
      if (point.age > this.maxAge) {
        this.trail.splice(i, 1);
      } else {
        this.drawPoint(point);
      }
    }
    this.texture.needsUpdate = true;
  }

  clear() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  addTouch(point: any) {
    let force = 0;
    let vx = 0;
    let vy = 0;
    const last = this.last;
    if (last) {
      const dx = point.x - last.x;
      const dy = point.y - last.y;
      if (dx === 0 && dy === 0) return;
      const dd = dx * dx + dy * dy;
      const d = Math.sqrt(dd);
      vx = dx / d;
      vy = dy / d;
      force = Math.min(dd * 20000, 2.0);
    }
    this.last = { x: point.x, y: point.y };
    this.trail.push({ x: point.x, y: point.y, age: 0, force, vx, vy });
  }

  drawPoint(point: any) {
    const pos = {
      x: point.x * this.width,
      y: (1 - point.y) * this.height,
    };

    let intensity = 1;
    if (point.age < this.maxAge * 0.3) {
      intensity = Math.sin((point.age / (this.maxAge * 0.3)) * (Math.PI / 2));
    } else {
      const t = 1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7);
      intensity = -t * (t - 2);
    }
    intensity *= point.force;

    const radius = this.radius;
    const color = `${((point.vx + 1) / 2) * 255}, ${
      ((point.vy + 1) / 2) * 255
    }, ${intensity * 255}`;
    const offset = this.size * 5;
    this.ctx.shadowOffsetX = offset;
    this.ctx.shadowOffsetY = offset;
    this.ctx.shadowBlur = radius * 1;
    this.ctx.shadowColor = `rgba(${color},${0.2 * intensity})`;

    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(255,0,0,1)";
    this.ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

export function LiquidGradient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Requested palette
    const color1 = new THREE.Vector3(255/255, 255/255, 255/255); // 255, 255, 255
    const color2 = new THREE.Vector3(251/255, 245/255, 232/255); // 251, 245, 232
    const color3 = new THREE.Vector3(240/255, 185/255, 65/255);  // 240, 185, 65
    const color4 = new THREE.Vector3(232/255, 161/255, 59/255);  // 232, 161, 59
    const color5 = new THREE.Vector3(196/255, 143/255, 49/255);  // 196, 143, 49

    // Initial Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const touchTexture = new TouchTexture();

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
      uColor1: { value: color1 },
      uColor2: { value: color2 },
      uColor3: { value: color3 },
      uColor4: { value: color4 },
      uColor5: { value: color5 },
      uColor6: { value: color3 },
      uSpeed: { value: 1.2 },
      uIntensity: { value: 1.0 }, // Changed intensity from 1.8 to 1.0 to prevent blowout
      uTouchTexture: { value: touchTexture.texture },
      uGrainIntensity: { value: 0.04 },
      uZoom: { value: 1.0 },
      uDarkNavy: { value: color2 }, // Using the cream color as the base/vignette background instead of dark bronze
      uGradientSize: { value: 1.0 },
      uGradientCount: { value: 6.0 },
      uColor1Weight: { value: 1.0 },
      uColor2Weight: { value: 1.0 },
    };

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          vUv = uv;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform vec3 uColor4;
        uniform vec3 uColor5;
        uniform vec3 uColor6;
        uniform float uSpeed;
        uniform float uIntensity;
        uniform sampler2D uTouchTexture;
        uniform float uGrainIntensity;
        uniform float uZoom;
        uniform vec3 uDarkNavy;
        uniform float uGradientSize;
        uniform float uGradientCount;
        uniform float uColor1Weight;
        uniform float uColor2Weight;
        
        varying vec2 vUv;
        
        float grain(vec2 uv, float time) {
          vec2 grainUv = uv * uResolution * 0.5;
          float grainValue = fract(sin(dot(grainUv + time, vec2(12.9898, 78.233))) * 43758.5453);
          return grainValue * 2.0 - 1.0;
        }
        
        void main() {
          // Add touch texture influence
          vec2 touchUv = vUv;
          vec4 touchData = texture2D(uTouchTexture, touchUv);
          
          vec2 uv = vUv;
          
          // Apply zoom
          uv = (uv - 0.5) * uZoom + 0.5;
          
          // Basic aspect ratio fix using actual screen resolution
          float aspect = uResolution.x / uResolution.y;
          uv.x = (uv.x - 0.5) * aspect + 0.5;
          
          // Apply water ripple distortion from touch
          if (touchData.a > 0.0) {
            vec2 touchDistortion = (touchData.xy - 0.5) * 2.0;
            uv += touchDistortion * touchData.z * 0.1;
          }
          
          float time = uTime;
          float gradientRadius = uGradientSize;
          
          vec2 center1 = vec2(0.5 + sin(time * uSpeed * 0.4) * 0.4, 0.5 + cos(time * uSpeed * 0.5) * 0.4);
          vec2 center2 = vec2(0.5 + cos(time * uSpeed * 0.6) * 0.5, 0.5 + sin(time * uSpeed * 0.45) * 0.5);
          vec2 center3 = vec2(0.5 + sin(time * uSpeed * 0.35) * 0.45, 0.5 + cos(time * uSpeed * 0.55) * 0.45);
          vec2 center4 = vec2(0.5 + cos(time * uSpeed * 0.5) * 0.4, 0.5 + sin(time * uSpeed * 0.4) * 0.4);
          vec2 center5 = vec2(0.5 + sin(time * uSpeed * 0.7) * 0.35, 0.5 + cos(time * uSpeed * 0.6) * 0.35);
          vec2 center6 = vec2(0.5 + cos(time * uSpeed * 0.45) * 0.5, 0.5 + sin(time * uSpeed * 0.65) * 0.5);
          
          float dist1 = length(uv - center1);
          float dist2 = length(uv - center2);
          float dist3 = length(uv - center3);
          float dist4 = length(uv - center4);
          float dist5 = length(uv - center5);
          float dist6 = length(uv - center6);
          
          float influence1 = 1.0 - smoothstep(0.0, gradientRadius, dist1);
          float influence2 = 1.0 - smoothstep(0.0, gradientRadius, dist2);
          float influence3 = 1.0 - smoothstep(0.0, gradientRadius, dist3);
          float influence4 = 1.0 - smoothstep(0.0, gradientRadius, dist4);
          float influence5 = 1.0 - smoothstep(0.0, gradientRadius, dist5);
          float influence6 = 1.0 - smoothstep(0.0, gradientRadius, dist6);
          
          vec2 rotatedUv1 = uv - 0.5;
          float angle1 = time * uSpeed * 0.15;
          rotatedUv1 = vec2(rotatedUv1.x * cos(angle1) - rotatedUv1.y * sin(angle1), rotatedUv1.x * sin(angle1) + rotatedUv1.y * cos(angle1)) + 0.5;
          
          vec2 rotatedUv2 = uv - 0.5;
          float angle2 = -time * uSpeed * 0.12;
          rotatedUv2 = vec2(rotatedUv2.x * cos(angle2) - rotatedUv2.y * sin(angle2), rotatedUv2.x * sin(angle2) + rotatedUv2.y * cos(angle2)) + 0.5;
          
          float radialInfluence1 = 1.0 - smoothstep(0.0, 0.8, length(rotatedUv1 - 0.5));
          float radialInfluence2 = 1.0 - smoothstep(0.0, 0.8, length(rotatedUv2 - 0.5));
          
          // Use a weighted average approach to prevent color blowout
          vec3 color = vec3(0.0);
          float totalWeight = 0.0;
          
          float w1 = influence1 * (0.55 + 0.45 * sin(time * uSpeed)) * uColor1Weight;
          color += uColor1 * w1;
          totalWeight += w1;
          
          float w2 = influence2 * (0.55 + 0.45 * cos(time * uSpeed * 1.2)) * uColor2Weight;
          color += uColor2 * w2;
          totalWeight += w2;
          
          float w3 = influence3 * (0.55 + 0.45 * sin(time * uSpeed * 0.8)) * uColor1Weight;
          color += uColor3 * w3;
          totalWeight += w3;
          
          float w4 = influence4 * (0.55 + 0.45 * cos(time * uSpeed * 1.3)) * uColor2Weight;
          color += uColor4 * w4;
          totalWeight += w4;
          
          float w5 = influence5 * (0.55 + 0.45 * sin(time * uSpeed * 1.1)) * uColor1Weight;
          color += uColor5 * w5;
          totalWeight += w5;
          
          float w6 = influence6 * (0.55 + 0.45 * cos(time * uSpeed * 0.9)) * uColor2Weight;
          color += uColor6 * w6;
          totalWeight += w6;
          
          // Add radial highlights as extra weight
          float rw1 = radialInfluence1 * 0.6 * uColor1Weight;
          color += uColor1 * rw1;
          totalWeight += rw1;
          
          float rw2 = radialInfluence2 * 0.5 * uColor2Weight;
          color += mix(uColor2, uColor4, 0.5) * rw2;
          totalWeight += rw2;
          
          // Normalize to prevent blowing out entirely
          if(totalWeight > 0.0) {
            color = color / totalWeight;
          } else {
            color = uColor2; // Fallback to cream if weight is somehow zero
          }
          
          // Subtle contrast enhancement instead of heavy multiplication
          float luminance = dot(color, vec3(0.299, 0.587, 0.114));
          color = mix(vec3(luminance), color, 1.1); // Reduced saturation boost so it feels elegant
          
          // Base color mixing for empty spaces (should be the darkest color)
          // Since it's normalized, there are fewer 'empty' spaces, but we can darken edges
          float distToCenter = length(uv - 0.5);
          float vignette = smoothstep(0.3, 1.2, distToCenter);
          color = mix(color, uDarkNavy, vignette * 0.3); // Gentle vignette into cream
          
          // Enhanced interaction highlight based on touch force/intensity
          if (touchData.a > 0.0) {
            float interactionGlow = touchData.z * 1.0;
            // The glow will be a bright mix of white and color3
            vec3 glowColor = mix(uColor1, uColor3, 0.5);
            color = mix(color, glowColor, interactionGlow * 0.5);
            
            // Edge of touch ripple gets the cream color instead of darkening to grey
            vec3 edgeHighlight = uColor2; // Changed from uColor5 * touchData.x which caused dark grey
            color = mix(color, edgeHighlight, touchData.z * 0.4);
          }
          
          color += grain(vUv, time) * uGrainIntensity;
          
          gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
        }
      `,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationFrameId: number;
    let time = 0;
    const clock = new THREE.Clock();

    const render = () => {
      const delta = clock.getDelta();
      time += delta;
      
      touchTexture.update();
      uniforms.uTime.value = time;
      
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Event handlers
    const handleResize = () => {
      if (!container) return;
      renderer.setSize(container.clientWidth, container.clientHeight);
      uniforms.uResolution.value.set(container.clientWidth, container.clientHeight);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      touchTexture.addTouch({ x, y });
    };

    window.addEventListener("resize", handleResize);
    container.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animationFrameId);
      container.removeChild(renderer.domElement);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
      touchTexture.texture.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-auto" style={{ zIndex: 0 }} />;
}