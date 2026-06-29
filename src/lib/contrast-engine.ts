// --- DYNAMIC CONTRAST ENGINE (Math-Synced) ---
// Mirrors the exact GLSL mix math (smoothstep(0.2, 0.8, uProgress)) to determine
// background brightness without reading DOM pixels — runs at 0 re-render cost.
export function calculateLuminance(progress: number): number {
  const mixFactor = Math.max(0, Math.min(1, (progress - 0.2) / 0.6))
  const r = 0.12 * (1 - mixFactor) + 0.35 * mixFactor
  const g = 0.12 * (1 - mixFactor) + 0.05 * mixFactor
  const b = 0.13 * (1 - mixFactor) + 0.08 * mixFactor
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function getDynamicTextColor(progress: number): string {
  return calculateLuminance(progress) > 0.5 ? '#000000' : '#F9F8F6'
}
