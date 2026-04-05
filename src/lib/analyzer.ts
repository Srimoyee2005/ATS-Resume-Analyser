import { KEYWORDS, type JobRole } from "./keywords";

export interface AnalysisResult {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  totalKeywords: number;
  suggestions: string[];
}

function preprocessText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s/+#.]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function analyzeResume(resumeText: string, role: JobRole): AnalysisResult {
  const processedText = preprocessText(resumeText);
  const keywords = KEYWORDS[role];

  const matched: string[] = [];
  const missing: string[] = [];

  for (const keyword of keywords) {
    const lowerKeyword = keyword.toLowerCase();
    if (processedText.includes(lowerKeyword)) {
      matched.push(keyword);
    } else {
      // Try partial matching for compound terms
      const parts = lowerKeyword.split(/[\s/]+/);
      if (parts.length > 1 && parts.every(p => processedText.includes(p))) {
        matched.push(keyword);
      } else {
        missing.push(keyword);
      }
    }
  }

  const score = keywords.length > 0
    ? Math.round((matched.length / keywords.length) * 10000) / 100
    : 0;

  const suggestions = generateSuggestions(missing, score);

  return {
    score,
    matchedKeywords: matched,
    missingKeywords: missing,
    totalKeywords: keywords.length,
    suggestions,
  };
}

function generateSuggestions(missing: string[], score: number): string[] {
  const suggestions: string[] = [];

  if (score < 30) {
    suggestions.push("Your resume needs significant improvement for this role. Consider gaining experience in the core skills listed as missing.");
  } else if (score < 60) {
    suggestions.push("You have a moderate match. Focus on adding the missing keywords to strengthen your application.");
  } else if (score < 80) {
    suggestions.push("Good match! A few more skills could make your resume stand out even more.");
  } else {
    suggestions.push("Excellent match! Your resume is well-aligned with this role.");
  }

  if (missing.length > 0) {
    const topMissing = missing.slice(0, 5);
    suggestions.push(`Consider highlighting these skills: ${topMissing.join(", ")}.`);
  }

  if (missing.length > 10) {
    suggestions.push("Consider taking online courses or certifications to fill skill gaps.");
  }

  suggestions.push("Ensure your resume uses industry-standard terminology for better ATS compatibility.");

  return suggestions;
}
