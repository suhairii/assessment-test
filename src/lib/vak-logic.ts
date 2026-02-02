import { vakQuestions } from "../data/vak-data";

export interface VakResult {
  scores: { V: number; A: number; K: number };
  percentage: { V: number; A: number; K: number };
  dominantType: string;
  preference: string;
}

export function calculateVakScore(answers: { [key: number]: string }): VakResult {
  const scores = { V: 0, A: 0, K: 0 };

  // Calculate raw scores
  vakQuestions.forEach((q) => {
    const answerValue = answers[q.id];
    const option = q.options.find(opt => opt.value === answerValue);
    if (option) {
      scores[option.type as keyof typeof scores]++;
    }
  });

  const total = scores.V + scores.A + scores.K;
  const percentage = {
    V: total > 0 ? Math.round((scores.V / total) * 100) : 0,
    A: total > 0 ? Math.round((scores.A / total) * 100) : 0,
    K: total > 0 ? Math.round((scores.K / total) * 100) : 0,
  };

  // Determine dominant type based on percentage/threshold
  // If scores are close (e.g. difference <= 2), it could be multimodal
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const highest = sorted[0];
  const second = sorted[1];
  const third = sorted[2];

  let dominantType = "";
  let preference = "";

  const diff12 = highest[1] - second[1];
  const diff23 = second[1] - third[1];

  if (diff12 <= 2 && (highest[1] - third[1]) <= 3) {
    dominantType = "Multimodal";
    preference = "Visual, Auditory & Kinestetik";
  } else if (diff12 <= 2) {
    dominantType = "Multimodal";
    const types = [highest[0], second[0]].sort();
    const map: Record<string, string> = {
        "A,V": "Visual & Auditory",
        "K,V": "Visual & Kinestetik",
        "A,K": "Auditory & Kinestetik"
    };
    preference = map[types.join(",")] || `${highest[0]} & ${second[0]}`;
  } else {
    dominantType = highest[0] === 'V' ? "Visual" : highest[0] === 'A' ? "Auditory" : "Kinestetik";
    preference = dominantType;
  }

  return { scores, percentage, dominantType, preference };
}
