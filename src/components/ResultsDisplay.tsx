import type { AnalysisResult } from "@/lib/analyzer";
import { CheckCircle2, XCircle, Lightbulb, BarChart3 } from "lucide-react";

interface ResultsDisplayProps {
  result: AnalysisResult;
  roleName: string;
}

function getScoreColor(score: number): string {
  if (score >= 75) return "text-success";
  if (score >= 50) return "text-warning";
  return "text-destructive";
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Moderate";
  return "Needs Improvement";
}

export function ResultsDisplay({ result, roleName }: ResultsDisplayProps) {
  const scoreColor = getScoreColor(result.score);

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Score Card */}
      <div className="rounded-xl bg-card p-6 shadow-card text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <BarChart3 className="h-5 w-5 text-muted-foreground" />
          <p className="text-sm font-medium text-muted-foreground">Job Readiness Score for {roleName}</p>
        </div>
        <p className={`text-6xl font-display font-bold ${scoreColor}`}>
          {result.score}%
        </p>
        <p className={`text-sm font-semibold mt-1 ${scoreColor}`}>{getScoreLabel(result.score)}</p>

        {/* Progress bar */}
        <div className="mt-4 h-3 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full gradient-score animate-score-fill"
            style={{ "--score-width": `${result.score}%` } as React.CSSProperties}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {result.matchedKeywords.length} of {result.totalKeywords} keywords matched
        </p>
      </div>

      {/* Matched & Missing */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <h3 className="font-display font-semibold">Matched Skills</h3>
            <span className="ml-auto text-xs bg-success/10 text-success px-2 py-0.5 rounded-full font-medium">
              {result.matchedKeywords.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.matchedKeywords.length > 0 ? (
              result.matchedKeywords.map((kw) => (
                <span key={kw} className="text-xs px-2.5 py-1 rounded-full bg-success/10 text-success font-medium">
                  {kw}
                </span>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No matched keywords found.</p>
            )}
          </div>
        </div>

        <div className="rounded-xl bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <XCircle className="h-5 w-5 text-destructive" />
            <h3 className="font-display font-semibold">Missing Skills</h3>
            <span className="ml-auto text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full font-medium">
              {result.missingKeywords.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.missingKeywords.length > 0 ? (
              result.missingKeywords.map((kw) => (
                <span key={kw} className="text-xs px-2.5 py-1 rounded-full bg-destructive/10 text-destructive font-medium">
                  {kw}
                </span>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">All keywords matched!</p>
            )}
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="rounded-xl bg-card p-5 shadow-card">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="h-5 w-5 text-warning" />
          <h3 className="font-display font-semibold">Suggestions</h3>
        </div>
        <ul className="space-y-2">
          {result.suggestions.map((s, i) => (
            <li key={i} className="flex gap-2 text-sm text-muted-foreground">
              <span className="text-warning mt-0.5">•</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
