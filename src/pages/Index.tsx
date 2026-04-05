import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { extractTextFromPdf } from "@/lib/pdfExtractor";
import { analyzeResume, type AnalysisResult } from "@/lib/analyzer";
import { JOB_ROLES, type JobRole } from "@/lib/keywords";
import { Loader2, ScanSearch, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [role, setRole] = useState<JobRole>("software_engineer");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const text = await extractTextFromPdf(file);
      if (!text.trim()) {
        setError("Could not extract text from the PDF. The file might be scanned or image-based.");
        return;
      }
      const analysisResult = analyzeResume(text, role);
      setResult(analysisResult);
    } catch (err) {
      setError("Failed to process the PDF file. Please ensure it's a valid PDF.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError(null);
  };

  const selectedRoleLabel = JOB_ROLES.find((r) => r.value === role)?.label ?? "";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="gradient-hero py-12 md:py-16">
        <div className="container max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-1.5 mb-4">
            <ScanSearch className="h-4 w-4 text-primary-foreground" />
            <span className="text-xs font-semibold text-primary-foreground tracking-wide uppercase">AI-Powered Analysis</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground leading-tight">
            AI Resume Analyser
          </h1>
          <p className="mt-3 text-primary-foreground/80 text-sm md:text-base max-w-lg mx-auto">
            Upload your resume, select a target job role, and get an instant readiness score with actionable feedback.
          </p>
        </div>
      </header>

      <main className="container max-w-3xl py-8 md:py-12 space-y-6">
        {!result ? (
          <div className="rounded-xl bg-card p-6 md:p-8 shadow-elevated space-y-5 animate-fade-up">
            <div>
              <label className="text-sm font-semibold mb-2 block font-display">1. Upload Resume (PDF)</label>
              <FileUpload onFileSelect={setFile} selectedFile={file} onClear={() => setFile(null)} />
            </div>

            <div>
              <label className="text-sm font-semibold mb-2 block font-display">2. Select Target Role</label>
              <Select value={role} onValueChange={(v) => setRole(v as JobRole)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {JOB_ROLES.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {error && (
              <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-2">{error}</p>
            )}

            <Button
              onClick={handleAnalyze}
              disabled={!file || loading}
              className="w-full gradient-hero text-primary-foreground font-semibold h-12 text-base"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analysing...
                </>
              ) : (
                <>
                  <ScanSearch className="mr-2 h-5 w-5" />
                  Analyse Resume
                </>
              )}
            </Button>
          </div>
        ) : (
          <>
            <ResultsDisplay result={result} roleName={selectedRoleLabel} />
            <div className="text-center">
              <Button variant="outline" onClick={handleReset} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Analyse Another Resume
              </Button>
            </div>
          </>
        )}
      </main>

      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        AI Resume Analyser — Built with NLP-powered keyword matching
      </footer>
    </div>
  );
};

export default Index;
