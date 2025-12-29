"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "../components/Search_Header";
import { SearchResults } from "../components/SearchResults";
import { Alert, AlertStack } from "../components/Alert";

type SearchResultsData = {
  id: number;
  content: string;
};

type SearchResult = {
  title: string;
  data: SearchResultsData;
};

function SearchContent() {
  const params = useSearchParams();
  const query = params.get("query") ?? "";

  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [toastVariant, setToastVariant] = useState<"success" | "info" | "warning" | "error" | null>(null);

  useEffect(() => {
    if (!query) return;
    
    setError(null);
    setLoading(true);
    setStatusMessage(`Searching for "${query}"...`);
    setToastVariant("info");
    
    fetch("https://legal-doc-task.onrender.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ searchValue: query }),
    })
      .then((res) => res.json())
      .then((data) => {
        const arr: SearchResult[] = Array.isArray(data)
          ? data
          : (data.results as SearchResult[]) ||
            (data.data as SearchResult[]) ||
            [];
        setResults(arr);
        if (arr.length > 0) {
          setStatusMessage(
            `Found ${arr.length} result${arr.length === 1 ? "" : "s"}.`
          );
          setToastVariant("success");
        } else {
          setStatusMessage("No results found.");
          setToastVariant("warning");
        }
      })
      .catch((err) => {
        console.error("Search fetch error:", err);
        setError("Failed to load search results.");
        setStatusMessage("Error - Something went wrong.");
        setToastVariant("error");
      })
      .finally(() => setLoading(false));
  }, [query]);

  // Auto-dismiss toast
  useEffect(() => {
    if (!statusMessage) return;
    const t = setTimeout(() => {
      setStatusMessage("");
      setToastVariant(null);
      setError(null);
    }, 3000);
    return () => clearTimeout(t);
  }, [statusMessage]);

  return (
    <>
      {/* Status Toast */}
      <div className="fixed bottom-4 right-4 z-50 pointer-events-none">
        <AlertStack>
          {toastVariant && statusMessage && (
            <div className="pointer-events-auto">
              <Alert variant={toastVariant} message={statusMessage} />
            </div>
          )}
        </AlertStack>
      </div>

      {/* Results */}
      <div className="w-full max-w-6xl mt-4 px-4 min-h-[50vh]">
        {loading && (
             <div className="flex flex-col items-center justify-center py-20 gap-4">
               <div className="w-10 h-10 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
               <p className="text-[var(--muted-foreground)] animate-pulse">Analyzing documents...</p>
             </div>
        )}
        
        {!loading && results.length > 0 && <SearchResults results={results} />}
        
        {!loading && !error && results.length === 0 && query && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
             <div className="bg-[var(--muted)] p-4 rounded-full mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-[var(--muted-foreground)]">
                 <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
               </svg>
             </div>
             <h3 className="text-[var(--foreground)] text-lg font-semibold">No results found for "{query}"</h3>
             <p className="text-[var(--muted-foreground)] max-w-xs mt-2">
               Try checking for typos or using different keywords.
             </p>
          </div>
        )}
      </div>
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] selection:bg-[var(--primary)] selection:text-white">
      <main className="flex-grow flex flex-col items-center justify-start px-6 sm:px-8 lg:px-12 py-10 w-full max-w-7xl mx-auto">
        <Search />
        <Suspense fallback={<div className="text-[var(--muted-foreground)] py-10">Loading parameters...</div>}>
          <SearchContent />
        </Suspense>
      </main>
    </div>
  );
}
