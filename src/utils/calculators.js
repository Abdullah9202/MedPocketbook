// Pure calculation helpers (kept separate so they are easy to test).

export const toNumber = (s) => {
  if (s === null || s === undefined) return NaN;
  const n = parseFloat(String(s).replace(',', '.'));
  return Number.isFinite(n) ? n : NaN;
};

/** BMI from metric values. Returns NaN for invalid / implausible input. */
export function bmiMetric(weightKg, heightCm) {
  if (!(weightKg > 0 && weightKg < 500 && heightCm > 50 && heightCm < 280)) return NaN;
  const m = heightCm / 100;
  return weightKg / (m * m);
}

/** BMI from imperial values (pounds, feet, inches). */
export function bmiImperial(lb, ft, inch) {
  const totalIn = (ft || 0) * 12 + (inch || 0);
  return bmiMetric(lb * 0.45359237, totalIn * 2.54);
}

/** WHO adult BMI categories. */
export function bmiCategory(bmi) {
  if (!Number.isFinite(bmi)) return null;
  if (bmi < 18.5) return { label: 'Underweight', tone: 'warn' };
  if (bmi < 25) return { label: 'Healthy weight', tone: 'ok' };
  if (bmi < 30) return { label: 'Overweight', tone: 'warn' };
  return { label: 'Obesity', tone: 'bad' };
}

export const cToF = (c) => (c * 9) / 5 + 32;
export const fToC = (f) => ((f - 32) * 5) / 9;

// Glucose: 1 mmol/L ≈ 18.016 mg/dL
export const GLUCOSE_FACTOR = 18.016;
export const mgdlToMmol = (mg) => mg / GLUCOSE_FACTOR;
export const mmolToMgdl = (mmol) => mmol * GLUCOSE_FACTOR;

export const kgToLb = (kg) => kg / 0.45359237;
export const lbToKg = (lb) => lb * 0.45359237;

export const fmt = (n, d = 1) => (Number.isFinite(n) ? n.toFixed(d) : '—');
