import { describe, it, expect } from "vitest";
import { analyzeResume } from "@/lib/analyzer";

describe("analyzeResume", () => {
  it("scores a strong software engineer resume highly", () => {
    const resumeText = `
      John Doe - Software Engineer
      Skills: Python, Java, Git, Docker, SQL, Linux, REST API
      Experience with data structures, algorithms, OOP, agile methodology
      Unit testing, CI/CD, debugging, system design
      Cloud computing, microservices architecture, design patterns
      Code review, version control, problem solving, multithreading
    `;
    const result = analyzeResume(resumeText, "software_engineer");
    expect(result.score).toBeGreaterThan(70);
    expect(result.matchedKeywords.length).toBeGreaterThan(15);
    expect(result.missingKeywords.length).toBeLessThan(10);
    expect(result.suggestions.length).toBeGreaterThan(0);
  });

  it("scores an unrelated resume low", () => {
    const resumeText = `
      Marketing Manager with 10 years experience in brand strategy,
      social media campaigns, content creation, and customer engagement.
    `;
    const result = analyzeResume(resumeText, "software_engineer");
    expect(result.score).toBeLessThan(15);
    expect(result.missingKeywords.length).toBeGreaterThan(20);
  });

  it("returns all required fields", () => {
    const result = analyzeResume("python sql git", "data_scientist");
    expect(result).toHaveProperty("score");
    expect(result).toHaveProperty("matchedKeywords");
    expect(result).toHaveProperty("missingKeywords");
    expect(result).toHaveProperty("totalKeywords");
    expect(result).toHaveProperty("suggestions");
    expect(result.matchedKeywords).toContain("python");
    expect(result.matchedKeywords).toContain("sql");
  });

  it("handles empty text", () => {
    const result = analyzeResume("", "web_developer");
    expect(result.score).toBe(0);
    expect(result.matchedKeywords).toHaveLength(0);
    expect(result.missingKeywords.length).toBe(result.totalKeywords);
  });
});
