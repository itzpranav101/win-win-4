/**
 * Rough coastlines (lon, lat) for the Madurai → Singapore map, projected
 * equirectangularly onto a 640×360 canvas covering lon 74–106°E, lat 16°N–2°S.
 * Land is rendered as a dot matrix in a single <path>, so it costs one DOM node.
 */
type Pt = [number, number];

const LON0 = 74;
const LAT0 = 16;
const K = 20; // px per degree
export const MAP_W = 640;
export const MAP_H = 360;

export const project = ([lon, lat]: Pt): Pt => [(lon - LON0) * K, (LAT0 - lat) * K];

const LAND: Pt[][] = [
  // Southern India
  [[74, 16], [74.3, 15], [74.8, 12.9], [75.6, 11.3], [76.2, 9.9], [77, 8.4], [77.55, 8.08], [78.1, 8.8], [79.3, 9.3], [79.85, 10.3], [79.85, 11.5], [80.3, 13.1], [80.1, 14.4], [80.6, 15.6], [81.5, 16]],
  // Sri Lanka
  [[79.9, 9.8], [80.3, 9.6], [81.2, 8.5], [81.9, 7], [81.6, 6.2], [80.6, 5.9], [80, 6.6], [79.8, 7.9]],
  // Myanmar / Thailand / Malay Peninsula
  [[97.6, 16], [98.2, 13.5], [98.6, 10.5], [98.3, 8.2], [99.6, 6.9], [100.3, 5.5], [100.4, 4.2], [101, 3], [101.8, 2.3], [103.4, 1.35], [104.25, 1.4], [103.9, 2.4], [103.4, 3.9], [103.4, 4.8], [102.5, 6], [101.2, 6.9], [100.4, 7.3], [100, 9], [99.2, 10.3], [99.9, 12.6], [100.9, 13.4], [100.9, 16]],
  // Cambodia / Vietnam (clipped at 106°E)
  [[101.4, 16], [101.4, 13.6], [102.3, 12.2], [103, 11], [104.3, 10.4], [104.8, 8.7], [105.2, 8.6], [106, 9.3], [106, 16]],
  // Sumatra
  [[95.3, 5.6], [97.5, 5.2], [98.7, 3.8], [100.4, 2.2], [101.5, 1.7], [103.7, 0.5], [104.6, -1.2], [105.6, -2], [101.3, -2], [100.3, -0.8], [99.1, 0.9], [97.9, 2.3], [96.4, 3.9], [95.2, 5.2]],
];

function inside([x, y]: Pt, poly: Pt[]) {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

let cache: string | null = null;

/** SVG path data: one zero-length segment per land dot (rendered with round caps). */
export function landDotsPath(step = 9): string {
  if (cache) return cache;
  const polys = LAND.map((p) => p.map(project));
  let d = '';
  for (let y = step / 2; y < MAP_H; y += step) {
    for (let x = step / 2; x < MAP_W; x += step) {
      if (polys.some((p) => inside([x, y], p))) d += `M${x} ${y}h0`;
    }
  }
  cache = d;
  return d;
}

export const MADURAI = project([78.12, 9.93]);
export const SINGAPORE = project([103.82, 1.35]);
