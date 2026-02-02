import { iqAnswerKeys, iqScoreMap } from "../data/iq-data";

export interface IqResult {
  correctCount: number;
  totalQuestions: number;
  iqScore: number;
  category: string;
}

export function calculateIqScore(answers: { [key: number]: string }): IqResult {
  let correctCount = 0;
  const totalQuestions = 60;

  for (let i = 1; i <= totalQuestions; i++) {
    const userAns = answers[i]?.toUpperCase();
    const correctAns = iqAnswerKeys[i]?.toUpperCase();
    if (userAns === correctAns) {
      correctCount++;
    }
  }

  // Find corresponding IQ score from map
  let iqScore = 70; // Default / Minimum
  if (correctCount >= 60) iqScore = 165;
  else if (correctCount <= 22) iqScore = 80;
  else iqScore = iqScoreMap[correctCount] || 80;

  // Determine category
  let category = "";
  if (iqScore < 90) category = "Kecerdasan di bawah rata-rata";
  else if (iqScore < 110) category = "Kecerdasan rata-rata";
  else if (iqScore < 120) category = "Kecerdasan di atas rata-rata";
  else if (iqScore < 130) category = "Kecerdasan tinggi";
  else if (iqScore < 145) category = "Kecerdasan superior";
  else category = "Sangat berbakat";

  return { correctCount, totalQuestions, iqScore, category };
}
