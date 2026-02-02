import { discAnswerKeysMost, discAnswerKeysLeast, conversionTables, profileCodes } from "../data/disc-data";

export interface DiscResult {
  most: { D: number; I: number; S: number; C: number; X: number };
  least: { D: number; I: number; S: number; C: number; X: number };
  graphMost: { D: number; I: number; S: number; C: number };
  graphLeast: { D: number; I: number; S: number; C: number };
  profileCodeMost: string;
  profileCodeLeast: string;
  profileTypeMost: string | undefined;
  profileTypeLeast: string | undefined;
  highestMost: { trait: string; value: number; label: string };
  highestLeast: { trait: string; value: number; label: string };
}

// Helper to parse a code string into structured Highs and Lows
// e.g. "HCLDLILS" -> { highs: ["C"], lows: ["D", "I", "S"] } (ordered)
function parseCode(code: string) {
  const highs: string[] = [];
  const lows: string[] = [];
  
  // Code is 8 chars, 4 pairs
  for (let i = 0; i < 8; i += 2) {
    const status = code[i]; // 'H' or 'L'
    const trait = code[i+1]; // 'D', 'I', 'S', 'C'
    
    if (status === 'H') {
      highs.push(trait);
    } else {
      lows.push(trait);
    }
  }
  return { highs, lows };
}

function findClosestProfile(userCode: string): string | undefined {
  // 1. Try exact match
  if (profileCodes[userCode]) return profileCodes[userCode];

  // 2. Fuzzy match based on High Traits Sequence
  const userParts = parseCode(userCode);
  const userHighs = userParts.highs;
  
  // If no highs, we can't match standard profiles easily
  if (userHighs.length === 0) return undefined;

  // Try matching with full Highs, then reduce one by one (e.g. S,C,D -> S,C -> S)
  for (let i = userHighs.length; i > 0; i--) {
    const currentHighsToCheck = userHighs.slice(0, i);
    
    for (const [key, profileName] of Object.entries(profileCodes)) {
       const keyParts = parseCode(key);
       
       // Check if key's Highs match exactly the current subset of user Highs
       if (currentHighsToCheck.length === keyParts.highs.length && 
           currentHighsToCheck.every((val, index) => val === keyParts.highs[index])) {
          return profileName;
       }
    }
  }
  
  return undefined;
}

export function calculateDiscScore(answers: { [key: number]: { most: string; least: string } }): DiscResult {
  const rawMost = { D: 0, I: 0, S: 0, C: 0, X: 0 };
  const rawLeast = { D: 0, I: 0, S: 0, C: 0, X: 0 };

  for (let i = 1; i <= 24; i++) {
    const answer = answers[i];
    if (!answer) continue;

    if (answer.most) {
      const keyStr = discAnswerKeysMost[i];
      let char: string | null = null;
      if (answer.most === "A") char = keyStr[0];
      else if (answer.most === "B") char = keyStr[1];
      else if (answer.most === "C") char = keyStr[2];
      else if (answer.most === "D") char = keyStr[3];

      if (char && char !== "X") {
        rawMost[char as keyof typeof rawMost]++;
      }
    }

    if (answer.least) {
      const keyStr = discAnswerKeysLeast[i];
      let char: string | null = null;
      if (answer.least === "A") char = keyStr[0];
      else if (answer.least === "B") char = keyStr[1];
      else if (answer.least === "C") char = keyStr[2];
      else if (answer.least === "D") char = keyStr[3];

      if (char && char !== "X") {
        rawLeast[char as keyof typeof rawLeast]++;
      }
    }
  }

  const graphMost = {
    D: (conversionTables.most.D as any)[rawMost.D] || 0,
    I: (conversionTables.most.I as any)[rawMost.I] || 0,
    S: (conversionTables.most.S as any)[rawMost.S] || 0,
    C: (conversionTables.most.C as any)[rawMost.C] || 0,
  };

  const graphLeast = {
    D: (conversionTables.least.D as any)[rawLeast.D] || 0,
    I: (conversionTables.least.I as any)[rawLeast.I] || 0,
    S: (conversionTables.least.S as any)[rawLeast.S] || 0,
    C: (conversionTables.least.C as any)[rawLeast.C] || 0,
  };

  const getCode = (scores: { D: number; I: number; S: number; C: number }) => {
    const labeled = {
      D: scores.D > 50 ? "HD" : "LD",
      I: scores.I > 50 ? "HI" : "LI",
      S: scores.S > 50 ? "HS" : "LS",
      C: scores.C > 50 ? "HC" : "LC",
    };

    const entries = [
      { id: "D", score: scores.D, label: labeled.D },
      { id: "I", score: scores.I, label: labeled.I },
      { id: "S", score: scores.S, label: labeled.S },
      { id: "C", score: scores.C, label: labeled.C },
    ];

    entries.sort((a, b) => b.score - a.score);
    
    return entries.map(e => e.label).join("");
  };

  const profileCodeMost = getCode(graphMost);
  const profileCodeLeast = getCode(graphLeast);

  const getHighest = (scores: { D: number; I: number; S: number; C: number }) => {
    const entries = Object.entries(scores) as [keyof typeof scores, number][];
    // Sort descending by score, then by specific order D-I-S-C if needed (simplified here)
    entries.sort((a, b) => b[1] - a[1]);
    const highest = entries[0];
    return {
      trait: highest[0],
      value: highest[1],
      label: `${highest[0]} Tinggi`
    };
  };

  const highestMost = getHighest(graphMost);
  const highestLeast = getHighest(graphLeast);

  return {
    most: rawMost,
    least: rawLeast,
    graphMost,
    graphLeast,
    profileCodeMost,
    profileCodeLeast,
    profileTypeMost: findClosestProfile(profileCodeMost),
    profileTypeLeast: findClosestProfile(profileCodeLeast),
    highestMost,
    highestLeast
  };
}