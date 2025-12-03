export default function useId(prefix = "") {
    return prefix + Math.random().toString(36).slice(2, 9);
}

export const GRID = 16;
export const snap = (v: number) => Math.round(v / GRID) * GRID;