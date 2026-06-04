// Full-screen synthwave/arcade background shader.
// Pixelation comes from rendering into a low-resolution canvas that CSS
// upscales with nearest-neighbour; this shader adds the "low-bitrate" feel
// via ordered (Bayer) dithering + colour posterization.

export const backgroundVert = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

export const backgroundFrag = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec2  uRes;
uniform float uScroll;
uniform float uReduce;
uniform vec3  uTint;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

// 2x2 ordered dither matrix → [0 2 / 3 1] / 4
float bayer2(vec2 p) {
  float x = mod(floor(p.x), 2.0);
  float y = mod(floor(p.y), 2.0);
  if (x < 0.5 && y < 0.5) return 0.0;
  if (x >= 0.5 && y < 0.5) return 2.0 / 4.0;
  if (x < 0.5 && y >= 0.5) return 3.0 / 4.0;
  return 1.0 / 4.0;
}

void main() {
  vec2 uv = vUv;
  float aspect = uRes.x / max(uRes.y, 1.0);
  float t = uTime * (1.0 - uReduce);
  float horizon = 0.42;

  // Sky gradient
  vec3 skyTop = vec3(0.02, 0.01, 0.05);
  vec3 skyHorizon = vec3(0.30, 0.06, 0.42);
  vec3 col = mix(skyHorizon, skyTop, smoothstep(horizon, 1.0, uv.y));

  // Stars above the horizon
  if (uv.y > horizon) {
    vec2 g = floor(uv * uRes / 3.0);
    float h = hash(g);
    float tw = 0.5 + 0.5 * sin(t * 2.0 + h * 30.0);
    float star = step(0.987, h) * tw;
    col += vec3(star) * vec3(0.6, 0.7, 1.0);
  }

  // Synthwave sun with scanline gaps in its lower half
  vec2 c = vec2(0.5, horizon + 0.18);
  vec2 d = uv - c;
  d.x *= aspect;
  float r = length(d);
  float sun = smoothstep(0.20, 0.19, r);
  float gap = step(0.5, fract((uv.y - c.y) * 42.0 + 0.5));
  float lowerHalf = step(uv.y, c.y);
  sun *= 1.0 - lowerHalf * gap;
  vec3 sunCol = mix(vec3(1.0, 0.85, 0.2), vec3(1.0, 0.2, 0.6),
                    smoothstep(c.y - 0.2, c.y + 0.2, uv.y));
  col = mix(col, sunCol, sun);
  col += sunCol * smoothstep(0.5, 0.0, r) * 0.25;

  // Perspective grid floor
  if (uv.y < horizon) {
    float yy = horizon - uv.y;
    float depth = 0.15 / (yy + 0.02);
    float scroll = t * 0.15 + uScroll * 2.5;
    float lz = abs(fract(depth - scroll) - 0.5);
    float gridZ = smoothstep(0.06, 0.0, lz);
    float xx = (uv.x - 0.5) * depth * 3.0;
    float lx = abs(fract(xx) - 0.5);
    float gridX = smoothstep(0.06, 0.0, lx);
    float grid = max(gridZ, gridX);
    vec3 gridCol = mix(vec3(0.10, 0.60, 0.90), vec3(0.60, 0.20, 0.90), uv.x);
    col = mix(col * 0.55, gridCol, grid * 0.9);
  }

  // Section tint (driven by scroll)
  col = mix(col, col * uTint, 0.35);

  // Low-bitrate: dither then posterize to a limited palette
  float levels = 6.0;
  float dith = (bayer2(gl_FragCoord.xy) - 0.5) / levels;
  col += dith;
  col = floor(col * levels) / levels;

  gl_FragColor = vec4(col, 1.0);
}
`
