'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// --- WEBGL SHADER MATERIAL ---
// Liquid transition shader from Schist (stone) to Burgundy (wine) using Simplex Noise
const fragmentShader = `
  uniform float uProgress;
  uniform float uTime;
  varying vec2 vUv;

  // 2D Simplex Noise Function
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    // Color A: Dark Schist Grey
    vec3 colorA = vec3(0.12, 0.12, 0.13);
    
    // Color B: Deep Burgundy
    vec3 colorB = vec3(0.35, 0.05, 0.08);

    // Create a flowing noise field driven by time and UV
    vec2 noiseUv = vUv * 3.0;
    noiseUv.y += uTime * 0.15;
    noiseUv.x += snoise(vec2(noiseUv.x, uTime * 0.1)) * 0.4;

    // Generate noise value [-1, 1] mapped to [0, 1]
    float n = snoise(noiseUv) * 0.5 + 0.5;

    // Distort the transition threshold with the noise pattern
    // The uProgress value pushes the frontier forward
    float mixFactor = smoothstep(0.2, 0.8, uProgress + (n * 0.6 - 0.3));

    // Calculate final interpolated color
    vec3 finalColor = mix(colorA, colorB, mixFactor);
    
    // Add subtle liquid specular highlights along the transitional edges
    float highlight = smoothstep(0.85, 1.0, n) * mixFactor * (1.0 - mixFactor) * 0.4;
    finalColor += highlight;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

function BackgroundShader({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(() => ({
    uProgress: { value: 0 },
    uTime: { value: 0 }
  }), [])

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uProgress.value = progressRef.current
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh>
      <planeGeometry args={[100, 100]} />
      <shaderMaterial 
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  )
}

// --- DYNAMIC CONTRAST ENGINE (Math-Synced) ---
// Mirrors the exact GLSL mix math to determine background brightness without reading DOM pixels.
function calculateLuminance(progress: number) {
  // Approximate the smoothstep used in the shader: smoothstep(0.2, 0.8, uProgress)
  const mixFactor = Math.max(0, Math.min(1, (progress - 0.2) / 0.6));
  
  // Color A (Schist): [0.12, 0.12, 0.13]
  // Color B (Burgundy): [0.35, 0.05, 0.08]
  const r = 0.12 * (1 - mixFactor) + 0.35 * mixFactor;
  const g = 0.12 * (1 - mixFactor) + 0.05 * mixFactor;
  const b = 0.13 * (1 - mixFactor) + 0.08 * mixFactor;
  
  // Standard Relative Luminance formula
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export default function WineShowcase({ dictionary }: { dictionary: any }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const textRefs = useRef<(HTMLDivElement | null)[]>([])
  const bottleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // 1. Core Scroll Pipeline (Drives WebGL + Contrast Engine)
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        progressRef.current = self.progress

        // Execute Contrast Math
        const lum = calculateLuminance(self.progress)
        const isLightBg = lum > 0.5
        
        // Dynamically inject CSS Variable for instantly responsive text color (zero React re-renders)
        if (containerRef.current) {
          containerRef.current.style.setProperty('--dynamic-text', isLightBg ? '#000000' : '#F9F8F6')
        }
      }
    })

    // 2. 2D Bottle Image Physics (High-Fidelity DOM Animation)
    if (bottleRef.current) {
      gsap.fromTo(bottleRef.current,
        { scale: 0.85, rotation: -4, y: -50 },
        { 
          scale: 1.15,
          rotation: 4,
          y: 50,
          ease: "none", // Linear mapping to scroll
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2 // Buttery smooth interpolation
          }
        }
      )
    }

    // DOM Text Fade Animations
    textRefs.current.forEach((text, index) => {
      if (text) {
        gsap.fromTo(text, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0,
            scrollTrigger: {
              trigger: text,
              start: "top center+=20%",
              end: "center center",
              scrub: true
            }
          }
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-screen h-[300vh] bg-black" style={{ '--dynamic-text': '#F9F8F6' } as React.CSSProperties}>
      
      {/* LAYER 1: Bounded Sticky Canvas (WebGL Liquid Shader) */}
      <div className="absolute top-0 left-0 w-screen h-full z-0 pointer-events-none">
        <div className="sticky top-0 left-0 w-screen h-screen overflow-hidden">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ width: '100vw', height: '100vh' }}>
            <BackgroundShader progressRef={progressRef} />
          </Canvas>
        </div>
      </div>

      {/* LAYER 2: Sticky 2D Bottle Image Engine */}
      <div className="absolute top-0 left-0 w-screen h-full z-10 pointer-events-none">
        <div className="sticky top-0 left-0 w-screen h-screen flex items-center justify-center overflow-hidden">
          {/* GSAP Target for Physics Transforms */}
          <div ref={bottleRef} className="relative w-[30vw] min-w-[200px] max-w-[400px] aspect-[1/3]">
            <img 
              src="/images/bottle-placeholder.png" 
              alt="Quinta da Touriga Chã Wine Bottle"
              className="w-full h-full object-contain filter drop-shadow-2xl opacity-90"
              onError={(e) => {
                // Temporary visual fallback if image is missing from repo
                const target = e.target as HTMLImageElement;
                target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 300'><rect width='100' height='300' fill='black' opacity='0.5'/><text x='50%' y='50%' fill='%23D4AF37' text-anchor='middle' font-family='sans-serif' font-size='10'>BOTTLE PNG</text></svg>";
              }}
            />
          </div>
        </div>
      </div>

      {/* LAYER 3: DOM Overlay (Native scrolling text) */}
      <div className="relative z-20 w-screen h-[300vh] flex flex-col items-center pointer-events-none">
        
        {/* Title Section */}
        <div className="h-screen w-full flex items-center justify-center pointer-events-auto">
          <h2 className="text-4xl md:text-6xl font-heading text-[var(--color-gold)] uppercase tracking-widest drop-shadow-xl transition-colors duration-300">
            {dictionary.wines.title}
          </h2>
        </div>

        {/* Puro Tasting Notes */}
        <div 
          ref={el => { textRefs.current[0] = el }} 
          className="h-screen w-full flex flex-col items-start justify-center px-10 md:px-32 max-w-7xl mx-auto pointer-events-auto"
        >
          <h3 
            className="text-5xl md:text-8xl font-heading opacity-90 mb-6 transition-colors duration-300"
            style={{ color: 'var(--dynamic-text)' }}
          >
            {dictionary.wines.puro.name}
          </h3>
          <p 
            className="text-xl md:text-2xl font-body max-w-md font-light transition-colors duration-300"
            style={{ color: 'var(--dynamic-text)' }}
          >
            {dictionary.wines.puro.concept}
          </p>
          <p className="text-lg font-body text-[var(--color-gold)] mt-4 max-w-sm italic drop-shadow-md">
            {dictionary.wines.puro.tasting}
          </p>
        </div>

        {/* Tinto Tasting Notes */}
        <div 
          ref={el => { textRefs.current[1] = el }} 
          className="h-screen w-full flex flex-col items-end justify-center px-10 md:px-32 max-w-7xl mx-auto text-right pointer-events-auto"
        >
          <h3 className="text-5xl md:text-8xl font-heading text-[var(--color-gold)] opacity-90 mb-6 drop-shadow-2xl">
            {dictionary.wines.tinto.name}
          </h3>
          <p 
            className="text-xl md:text-2xl font-body max-w-md font-light ml-auto transition-colors duration-300"
            style={{ color: 'var(--dynamic-text)' }}
          >
            {dictionary.wines.tinto.concept}
          </p>
          <p 
            className="text-lg font-body opacity-90 mt-4 max-w-sm ml-auto italic transition-colors duration-300"
            style={{ color: 'var(--dynamic-text)' }}
          >
            {dictionary.wines.tinto.tasting}
          </p>
        </div>

      </div>
    </div>
  )
}
