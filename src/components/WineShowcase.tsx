'use client'

import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
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
// Mirrors the exact GLSL mix math (smoothstep(0.2, 0.8, uProgress)) to determine
// background brightness without reading DOM pixels — runs at 0 re-render cost.
function calculateLuminance(progress: number): number {
  const mixFactor = Math.max(0, Math.min(1, (progress - 0.2) / 0.6))
  const r = 0.12 * (1 - mixFactor) + 0.35 * mixFactor
  const g = 0.12 * (1 - mixFactor) + 0.05 * mixFactor
  const b = 0.13 * (1 - mixFactor) + 0.08 * mixFactor
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

// Bottle image paths.
// TODO: Replace with real product photos when supplied by photography team.
// Expected: /public/images/puro_bottle.png and /public/images/tinto_bottle.png
// (transparent-background PNGs, portrait orientation)
const PURO_BOTTLE_SRC = '/images/puro_bottle.png'
const TINTO_BOTTLE_SRC = '/images/tinto_bottle.png'

export default function WineShowcase({ dictionary }: { dictionary: any }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const textRefs = useRef<(HTMLDivElement | null)[]>([])
  const bottleRef = useRef<HTMLDivElement>(null)
  const puroImgRef = useRef<HTMLImageElement>(null)
  const tintoImgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // --- 1. Core Scroll Pipeline ---
    // Drives the WebGL uniform AND the Dynamic Contrast Engine on every tick.
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        progressRef.current = self.progress

        // Contrast engine: inject CSS variable, zero React re-renders
        const lum = calculateLuminance(self.progress)
        if (containerRef.current) {
          containerRef.current.style.setProperty(
            '--dynamic-text',
            lum > 0.5 ? '#000000' : '#F9F8F6'
          )
        }

        // --- Scroll-synced bottle crossfade ---
        // Layout: 300vh split into 3 equal 100vh panels:
        //   0–0.33  → title panel  (Puro fully visible)
        //   0.33–0.66 → Puro text panel (Puro fully visible)
        //   0.66–1.0  → Tinto text panel (Tinto fully visible)
        // Crossfade occupies a 0.08 window centred on the 0.66 boundary.
        const SWAP_START = 0.60
        const SWAP_END   = 0.68
        const tintoOpacity = Math.max(0, Math.min(1, (self.progress - SWAP_START) / (SWAP_END - SWAP_START)))
        const puroOpacity  = 1 - tintoOpacity

        if (puroImgRef.current)  puroImgRef.current.style.opacity  = String(puroOpacity)
        if (tintoImgRef.current) tintoImgRef.current.style.opacity = String(tintoOpacity)
      }
    })

    // --- 2. 2D Bottle Physics (scroll-scrubbed float + scale + rotation) ---
    if (bottleRef.current) {
      gsap.fromTo(
        bottleRef.current,
        { scale: 0.88, rotation: -4, y: -40 },
        {
          scale: 1.12,
          rotation: 4,
          y: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
          },
        }
      )
    }

    // --- 3. DOM Text Reveal Animations ---
    textRefs.current.forEach((text) => {
      if (!text) return
      gsap.fromTo(
        text,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: text,
            start: 'top center+=20%',
            end: 'center center',
            scrub: true,
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-[300vh] bg-black"
      style={{ '--dynamic-text': '#F9F8F6' } as React.CSSProperties}
    >
      {/* LAYER 1 — WebGL Liquid Shader (full-bleed sticky) */}
      <div className="absolute top-0 left-0 w-screen h-full z-0 pointer-events-none">
        <div className="sticky top-0 left-0 w-screen h-screen overflow-hidden">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            style={{ width: '100vw', height: '100vh' }}
          >
            <BackgroundShader progressRef={progressRef} />
          </Canvas>
        </div>
      </div>

      {/* LAYER 2 — Dual-Bottle 2D Engine (sticky, crossfade driven by scroll) */}
      <div className="absolute top-0 left-0 w-screen h-full z-10 pointer-events-none">
        <div className="sticky top-0 left-0 w-screen h-screen flex items-center justify-center overflow-hidden">
          {/* GSAP physics wrapper — both images stacked, crossfade via opacity */}
          <div
            ref={bottleRef}
            className="relative w-[28vw] min-w-[160px] max-w-[360px] aspect-[1/3]"
          >
            {/* Puro bottle — visible at scroll start */}
            <img
              ref={puroImgRef}
              src={PURO_BOTTLE_SRC}
              alt="Puro wine bottle — Quinta da Touriga Chã"
              className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl"
              style={{ opacity: 1, transition: 'opacity 0ms' /* JS controls opacity, no CSS lag */ }}
              // Fallback: only shows in development, never in production build
              onError={(e) => {
                if (process.env.NODE_ENV === 'development') {
                  const t = e.target as HTMLImageElement
                  t.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 260'%3E%3Crect x='28' y='0' width='24' height='30' rx='4' fill='%23D4AF37' opacity='.6'/%3E%3Crect x='10' y='30' width='60' height='220' rx='8' fill='%23D4AF37' opacity='.3'/%3E%3Ctext x='50%25' y='55%25' fill='%23D4AF37' text-anchor='middle' font-size='10' font-family='serif'%3EPURO%3C/text%3E%3C/svg%3E"
                }
              }}
            />

            {/* Tinto bottle — crossfades in at scroll 0.60–0.68 */}
            <img
              ref={tintoImgRef}
              src={TINTO_BOTTLE_SRC}
              alt="Quinta da Touriga Chã Tinto wine bottle"
              className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl"
              style={{ opacity: 0, transition: 'opacity 0ms' }}
              onError={(e) => {
                if (process.env.NODE_ENV === 'development') {
                  const t = e.target as HTMLImageElement
                  t.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 260'%3E%3Crect x='28' y='0' width='24' height='30' rx='4' fill='%235B1D30' opacity='.8'/%3E%3Crect x='10' y='30' width='60' height='220' rx='8' fill='%235B1D30' opacity='.6'/%3E%3Ctext x='50%25' y='55%25' fill='%23F9F8F6' text-anchor='middle' font-size='7' font-family='serif'%3EQta Touriga%3C/text%3E%3C/svg%3E"
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* LAYER 3 — DOM Text Overlay (scrolling, above WebGL) */}
      <div className="relative z-20 w-screen h-[300vh] flex flex-col items-center pointer-events-none">

        {/* Panel 1 — Section Title */}
        <div className="h-screen w-full flex items-center justify-center pointer-events-auto">
          <h2 className="text-4xl md:text-6xl font-heading text-[var(--color-gold)] uppercase tracking-widest drop-shadow-xl">
            {dictionary.wines.title}
          </h2>
        </div>

        {/* Panel 2 — Puro */}
        <div
          ref={el => { textRefs.current[0] = el }}
          className="h-screen w-full flex flex-col items-start justify-center px-8 md:px-32 pointer-events-auto"
        >
          <h3
            className="text-5xl md:text-8xl font-heading opacity-90 mb-6"
            style={{ color: 'var(--dynamic-text)' }}
          >
            {dictionary.wines.puro.name}
          </h3>
          <p
            className="text-xl md:text-2xl font-body max-w-md font-light mb-4"
            style={{ color: 'var(--dynamic-text)' }}
          >
            {dictionary.wines.puro.concept}
          </p>
          <p className="text-lg font-body text-[var(--color-gold)] max-w-sm italic drop-shadow-md">
            {dictionary.wines.puro.tasting}
          </p>
        </div>

        {/* Panel 3 — Tinto/QTC */}
        <div
          ref={el => { textRefs.current[1] = el }}
          className="h-screen w-full flex flex-col items-end justify-center px-8 md:px-32 text-right pointer-events-auto"
        >
          <h3 className="text-5xl md:text-8xl font-heading text-[var(--color-gold)] opacity-90 mb-6 drop-shadow-2xl">
            {dictionary.wines.tinto.name}
          </h3>
          <p
            className="text-xl md:text-2xl font-body max-w-md font-light ml-auto mb-4"
            style={{ color: 'var(--dynamic-text)' }}
          >
            {dictionary.wines.tinto.concept}
          </p>
          <p
            className="text-lg font-body opacity-90 max-w-sm ml-auto italic"
            style={{ color: 'var(--dynamic-text)' }}
          >
            {dictionary.wines.tinto.tasting}
          </p>
        </div>

      </div>
    </div>
  )
}
