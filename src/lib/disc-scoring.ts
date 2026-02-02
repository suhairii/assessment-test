/**
 * DISC Scoring Logic
 * Ported from com.frexor.pas.command.QuizCommand & com.frexor.pas.controller.DiscController
 */

import discContent from '../data/disc-content.json';

// Types for the DISC Content (from lang_in.properties)
export type DiscProfileId = keyof typeof discContent;
// @ts-ignore
export type DiscContent = typeof discContent[DiscProfileId];

// Answer Input: 24 Questions
// Answers are expected to be 'A', 'B', 'C', 'D'
// which map to indices 0, 1, 2, 3 respectively.
export interface DiscAnswer {
  questionIndex: number; // 1-24
  most: string; // 'A', 'B', 'C', 'D'
  least: string; // 'A', 'B', 'C', 'D'
}

// Result Structure
export interface DiscResult {
  graph1: { D: number; I: number; S: number; C: number }; // Scaled Scores (Most)
  graph2: { D: number; I: number; S: number; C: number }; // Scaled Scores (Least)
  graph3: { D: number; I: number; S: number; C: number }; // Change (Difference)
  profileCode: string; // e.g., "HCLDLILS"
  profileName: string; // e.g., "Analyzer #7"
  content?: any; // DiscContent or null
}

// --- DATA CONSTANTS (EXTRACTED FROM JAVA) ---

// Map string index (0=A, 1=B, 2=C, 3=D) to DISC Letter (D, I, S, C, or X)
// 1: "SICX" -> A=S, B=I, C=C, D=X
const ANSWER_KEY_MOST_STR: Record<number, string> = {
  1: "SICX", 2: "ICDX", 3: "XDSI", 4: "CSXI", 5: "XCXS", 
  6: "DSXX", 7: "XSDI", 8: "DIXX", 9: "ISDC", 10: "DCXS", 
  11: "ISXD", 12: "XDCS", 13: "DISX", 14: "CDIS", 15: "SXCX", 
  16: "IXXD", 17: "CSXD", 18: "ISXD", 19: "CDIS", 20: "DCXI", 
  21: "SXDC", 22: "IXDS", 23: "ICDX", 24: "DSIC"
};

const ANSWER_KEY_LEAST_STR: Record<number, string> = {
  1: "SXCD", 2: "ICDS", 3: "CDXI", 4: "XSDI", 5: "ICDS", 
  6: "DSIC", 7: "CXDI", 8: "XXSC", 9: "ISDX", 10: "DXIS", 
  11: "ISCD", 12: "IDXS", 13: "XISC", 14: "CXIX", 15: "XICD", 
  16: "XSCD", 17: "XSID", 18: "XXCD", 19: "XDIS", 20: "DXSI", 
  21: "ISDC", 22: "ICDS", 23: "IXDS", 24: "DSIC"
};

// Conversion Tables (Raw Score -> Scaled Score)
const CONVERSION_TABLE_MOST: Record<'D'|'I'|'S'|'C', Record<number, number>> = {
  D: {
    20: 100, 19: 100, 18: 99, 17: 98, 16: 97, 15: 93, 14: 95, 13: 83, 12: 79, 11: 76, 
    10: 73, 9: 65, 8: 59, 7: 53, 6: 48, 5: 43, 4: 38, 3: 33, 2: 24, 1: 15, 0: 3
  },
  I: {
    19: 100, 18: 100, 17: 100, 16: 100, 15: 100, 14: 100, 13: 100, 12: 100, 11: 100, 
    10: 97, 9: 92, 8: 88, 7: 83, 6: 73, 5: 68, 4: 56, 3: 43, 2: 35, 1: 20, 0: 8
  },
  S: {
    19: 100, 18: 100, 17: 100, 16: 100, 15: 100, 14: 100, 13: 100, 12: 97, 11: 89, 
    10: 85, 9: 78, 8: 74, 7: 67, 6: 61, 5: 55, 4: 45, 3: 38, 2: 30, 1: 22, 0: 11
  },
  C: {
    15: 100, 14: 100, 13: 100, 12: 100, 11: 100, 10: 100, 9: 96, 8: 89, 7: 84, 
    6: 73, 5: 66, 4: 54, 3: 40, 2: 29, 1: 16, 0: 0
  }
};

const CONVERSION_TABLE_LEAST: Record<'D'|'I'|'S'|'C', Record<number, number>> = {
  D: {
    21: 1, 20: 1, 19: 2, 18: 3, 17: 4, 16: 5, 15: 8, 14: 11, 13: 15, 12: 21, 
    11: 25, 10: 28, 9: 31, 8: 38, 7: 42, 6: 48, 5: 53, 4: 59, 3: 67, 2: 75, 1: 87, 0: 100
  },
  I: {
    19: 0, 18: 1, 17: 1, 16: 2, 15: 3, 14: 4, 13: 5, 12: 6, 11: 7, 
    10: 10, 9: 15, 8: 22, 7: 28, 6: 37, 5: 46, 4: 55, 3: 67, 2: 75, 1: 86, 0: 100
  },
  S: {
    19: 1, 18: 1, 17: 1, 16: 1, 15: 2, 14: 3, 13: 4, 12: 8, 11: 15, 
    10: 23, 9: 29, 8: 37, 7: 42, 6: 53, 5: 59, 4: 67, 3: 75, 2: 85, 1: 96, 0: 100
  },
  C: {
    16: 0, 15: 1, 14: 2, 13: 3, 12: 7, 11: 14, 10: 23, 9: 33, 8: 39, 7: 47, 
    6: 52, 5: 58, 4: 65, 3: 74, 2: 82, 1: 95, 0: 100
  }
};

const PATTERN_MAP: Record<string, string> = {
  "HCLDLILS": "Analyzer7", "HCLILDLS": "Analyzer7",
  "HCHSLDLI": "Coordinator21", "HCHSLILD": "Coordinator21",
  "HCHDLILS": "Implementor24", "HCHDLSLI": "Implementor24",
  "HCHILSLD": "Analyzer60", "HCHILDLS": "Analyzer60",
  "HCHIHDLS": "Analyzer55", "HCHDHILS": "Analyzer55",
  "HCHSHDLI": "Analyzer38", "HCHDHSLI": "Analyzer38",
  "HDLILCLS": "Conductor1", 
  "HDHILSLC": "Persuader12", "HDHILCLS": "Persuader12",
  "HDHCLILS": "Implementor9", "HDHCLSLI": "Implementor9",
  "HDHSLILC": "Conductor57", "HDHSLCLI": "Conductor57",
  "HDHIHCLS": "Conductor27", "HDHCHILS": "Conductor27",
  "HDHSHCLI": "Conductor42", "HDHCHSLI": "Conductor42",
  "HSLDLCLI": "Supporter5", "HSLDLILC": "Supporter5", "HSLCLDLI": "Supporter5", 
  "HSLCLILD": "Supporter5", "HSLILDLC": "Supporter5", "HSLILCLD": "Supporter5",
  "HSHCLDLI": "Coordinator20", "HSHCLILD": "Coordinator20",
  "HSHILDLC": "Relater17", "HSHILCLD": "Relater17",
  "HSHDLILC": "Supporter59", "HSHDLCLI": "Supporter59",
  "HSHIHCLD": "Supporter35", "HSHCHILD": "Supporter35",
  "HSHDHILC": "Supporter50", "HSHIHDLC": "Supporter50",
  "HILDLCLS": "Promoter3", "HILDLSLC": "Promoter3", "HILCLDLS": "Promoter3", 
  "HILCLSLD": "Promoter3", "HILSLDLC": "Promoter3", "HILSLCLD": "Promoter3",
  "HIHDLSLC": "Persuader13", "HIHDLCLS": "Persuader13",
  "HIHSLDLC": "Relater16", "HIHSLCLD": "Relater16",
  "HIHCLDLS": "Promoter58", "HIHCLSLD": "Promoter58",
  "HIHSHCLD": "Promoter47", "HIHCHSLD": "Promoter47",
  "HIHDHSLC": "Promoter30", "HIHSHDLC": "Promoter30"
};

// --- HELPERS ---

function getOptionIndex(char: string): number {
  const c = char.toUpperCase();
  if (c === 'A') return 0;
  if (c === 'B') return 1;
  if (c === 'C') return 2;
  if (c === 'D') return 3;
  return -1;
}

function getDiscValue(keyMap: Record<number, string>, qIndex: number, option: string): string | null {
  const keys = keyMap[qIndex]; // e.g., "SICX"
  if (!keys) return null;
  const idx = getOptionIndex(option);
  if (idx === -1 || idx >= keys.length) return null;
  return keys.charAt(idx); // 'S', 'I', 'C', or 'X'
}

function getScaledScore(table: Record<'D'|'I'|'S'|'C', Record<number, number>>, type: string, raw: number): number {
  if (type === 'X') return 0;
  const t = table[type as 'D'|'I'|'S'|'C'];
  if (t[raw] !== undefined) return t[raw];
  return t[raw] || 0;
}

export function calculateDiscResult(answers: DiscAnswer[]): DiscResult {
  // 1. Calculate Raw Scores
  const rawMost = { D: 0, I: 0, S: 0, C: 0, X: 0 };
  const rawLeast = { D: 0, I: 0, S: 0, C: 0, X: 0 };

  answers.forEach((ans) => {
    // Most
    const mVal = getDiscValue(ANSWER_KEY_MOST_STR, ans.questionIndex, ans.most);
    if (mVal && (mVal === 'D' || mVal === 'I' || mVal === 'S' || mVal === 'C' || mVal === 'X')) {
      rawMost[mVal]++;
    }

    // Least
    const lVal = getDiscValue(ANSWER_KEY_LEAST_STR, ans.questionIndex, ans.least);
    if (lVal && (lVal === 'D' || lVal === 'I' || lVal === 'S' || lVal === 'C' || lVal === 'X')) {
      rawLeast[lVal]++;
    }
  });

  // 2. Convert to Scaled Scores (Graph 1 & 2)
  const graph1 = {
    D: getScaledScore(CONVERSION_TABLE_MOST, 'D', rawMost.D),
    I: getScaledScore(CONVERSION_TABLE_MOST, 'I', rawMost.I),
    S: getScaledScore(CONVERSION_TABLE_MOST, 'S', rawMost.S),
    C: getScaledScore(CONVERSION_TABLE_MOST, 'C', rawMost.C),
  };

  const graph2 = {
    D: getScaledScore(CONVERSION_TABLE_LEAST, 'D', rawLeast.D),
    I: getScaledScore(CONVERSION_TABLE_LEAST, 'I', rawLeast.I),
    S: getScaledScore(CONVERSION_TABLE_LEAST, 'S', rawLeast.S),
    C: getScaledScore(CONVERSION_TABLE_LEAST, 'C', rawLeast.C),
  };

  const graph3 = {
    D: graph1.D - graph2.D,
    I: graph1.I - graph2.I,
    S: graph1.S - graph2.S,
    C: graph1.C - graph2.C,
  };

  // 4. Generate Profile Codes
  const generateCode = (scores: { D: number; I: number; S: number; C: number }): string => {
    // 1. Determine H/L
    const status = {
      D: scores.D > 50 ? 'HD' : 'LD',
      I: scores.I > 50 ? 'HI' : 'LI',
      S: scores.S > 50 ? 'HS' : 'LS',
      C: scores.C > 50 ? 'HC' : 'LC',
    };

    // 2. Sort by Value Descending.
    // Tie-breaking priority: D > I > S > C (Based on Java's nested if-else priority)
    const order: Array<keyof typeof scores> = ['D', 'I', 'S', 'C'];
    
    // Create an array of objects to sort
    const items = order.map(key => ({
      key,
      val: scores[key]
    }));
    
    // Sort
    items.sort((a, b) => {
      // Primary sort: Value Descending (Highest First)
      if (b.val > a.val) return 1;
      if (b.val < a.val) return -1;
      
      // Secondary sort (if equal): Maintain D, I, S, C order
      return order.indexOf(a.key) - order.indexOf(b.key); 
    });

    console.log("Debug Sort Code:", JSON.stringify(items)); // DEBUG LOG

    // 3. Concatenate
    let code = "";
    items.forEach(item => {
      code += status[item.key];
    });

    return code;
  };

  const profileCodeMost = generateCode(graph1);
  // const profileCodeLeast = generateCode(graph2); // Optional, if needed
  
  // 5. Match Pattern
  let profileName = PATTERN_MAP[profileCodeMost] || "Unknown";
  
  console.log("Debug Generated Code:", profileCodeMost);
  console.log("Debug Matched Profile:", profileName);

  // Try to find content
  // @ts-ignore
  let content = discContent[profileName] || null;

  return {
    graph1,
    graph2,
    graph3,
    profileCode: profileCodeMost, 
    profileName: profileName,
    content
  };
}
