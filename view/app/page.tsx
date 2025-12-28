"use client";
import { useEffect, useState } from "react";

// Components
import { DocumentCard } from "./components/card";
import { Search } from "./components/Search_Header";
import { SlideOver } from "./components/SlideOver";
import { SearchResults } from "./components/SearchResults";

// Types
type Document = {
  id: number;
  category: string;
  title: string;
  description: string;
  updatedAt: string;
  imageUrl: string;
};

type SearchResultsData = { id: number; content: string };
type SearchResult = { title: string; data: SearchResultsData };

export default function Home() {
  const [data, setData] = useState<Document[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  
  // Search Overlay State
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [toastVariant, setToastVariant] = useState<"success" | "info" | "warning" | "error" | null>(null);

  // Initial Data Fetch
  useEffect(() => {
    fetch("http://localhost:8080/")
      .then((res) => res.json())
      .then((resData) => {
        setData(resData.data || []);
      })
      .catch((err) => console.error("Initial fetch error:", err))
      .finally(() => setInitialLoading(false));
  }, []);

  // Search Handler
  const handleSearch = (query: string) => {
    setSearchError(null);
    setSearchLoading(true);
    setStatusMessage(`Searching for "${query}"...`);
    setToastVariant("info");
    setOverlayOpen(true);

    fetch("http://localhost:8080/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ searchValue: query }),
    })
      .then((res) => res.json())
      .then((resData) => {
        const arr: SearchResult[] = Array.isArray(resData)
          ? resData
          : (resData.results as SearchResult[]) || (resData.data as SearchResult[]) || [];
        
        setResults(arr);
        
        if (arr.length > 0) {
          setStatusMessage(`Found ${arr.length} result${arr.length === 1 ? "" : "s"}.`);
          setToastVariant("success");
        } else {
          setStatusMessage("No relevant documents found.");
          setToastVariant("warning");
        }
      })
      .catch((err) => {
        console.error("Search fetch error:", err);
        setSearchError("Failed to load search results. Please try again.");
        setStatusMessage("Error occurred while searching.");
        setToastVariant("error");
      })
      .finally(() => setSearchLoading(false));
  };

  const handleGenerateSummary = (title: string) => {
    setSearchError(null);
    setSearchLoading(true);
    setStatusMessage(`Generating summary for "${title}"...`);
    setToastVariant("info");
    setOverlayOpen(true);

    // Using the correct endpoint for summary generation
    fetch("http://localhost:8080/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: title }),
    })
      .then((res) => res.json())
      .then((resData) => {
        // Adapt response to SearchResult structure
        let content = "";
        
        // Handle different response formats
        if (resData.txt && typeof resData.txt === 'string') {
          // Format from user's example
          content = resData.txt;
        } else if (resData.result && typeof resData.result === 'string') {
          content = resData.result;
        } else if (typeof resData === 'string') {
          content = resData;
        } else {
          content = JSON.stringify(resData, null, 2);
        }

        const summaryResult: SearchResult = {
            title: `Summary: ${title}`,
            data: {
                id: Date.now(),
                content: content
            }
        };

        setResults([summaryResult]);
        setStatusMessage("Summary generated.");
      })
      .catch((err) => {
        console.error("Summary fetch error:", err);
        setSearchError("Failed to generate summary. Please try again.");
        setStatusMessage("Error generating summary.");
        setToastVariant("error");
      })
      .finally(() => setSearchLoading(false));
  };


  // Toast Auto-Dismiss
  useEffect(() => {
    if (!statusMessage) return;
    const t = setTimeout(() => {
      setStatusMessage("");
      setToastVariant(null);
    }, 3000);
    return () => clearTimeout(t);
  }, [statusMessage]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] selection:bg-[var(--primary)] selection:text-white">
      <main className="flex-grow flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full max-w-7xl mx-auto">
        
        {/* Hero Search Section */}
        <Search onSearch={handleSearch} />

        {/* Featured Documents Section */}
        <div className="w-full max-w-6xl flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
            <h2 className="text-[var(--foreground)] text-2xl font-bold tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[var(--primary)] rounded-full"></span>
              Recent Legal Documents
            </h2>
            <span className="text-sm font-medium text-[var(--muted-foreground)] bg-[var(--muted)] px-3 py-1 rounded-full">
              {initialLoading ? "Loading..." : `${data.length} documents`}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initialLoading ? (
              // Loading Skeleton
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] h-[420px] animate-pulse">
                  <div className="h-48 w-full bg-[var(--muted)]" />
                  <div className="p-5 flex flex-col gap-4 flex-1">
                    <div className="h-6 w-3/4 bg-[var(--muted)] rounded" />
                    <div className="h-4 w-full bg-[var(--muted)] rounded" />
                    <div className="h-4 w-5/6 bg-[var(--muted)] rounded" />
                    <div className="mt-auto pt-4 border-t border-[var(--border)] flex justify-between">
                      <div className="h-4 w-20 bg-[var(--muted)] rounded" />
                      <div className="h-4 w-20 bg-[var(--muted)] rounded" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
               data.map((doc: Document) => (
                <DocumentCard 
                  key={doc.id} 
                  {...doc} 
                  onGenerateSummary={handleGenerateSummary}
                />
              ))
            )}
          </div>
        </div>
      </main>

      {/* Slide-up Search Results Overlay */}
      <SlideOver 
        open={overlayOpen} 
        onClose={() => setOverlayOpen(false)} 
        title="Analysis Results"
        statusMessage={statusMessage}
        toastVariant={toastVariant}
      >
        <div className="pb-10">
          {searchLoading && (
             <div className="flex flex-col items-center justify-center py-20 gap-4">
               <div className="w-10 h-10 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
               <p className="text-[var(--muted-foreground)] animate-pulse">Analyzing documents...</p>
             </div>
          )}

          {!searchLoading && !searchError && results.length > 0 && (
            <SearchResults results={results} />
          )}

          {!searchLoading && !searchError && results.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="bg-[var(--muted)] p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-[var(--muted-foreground)]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
              <h3 className="text-[var(--foreground)] text-lg font-semibold">No results found</h3>
              <p className="text-[var(--muted-foreground)] max-w-xs mt-2">
                Try adjusting your search query or keywords to find what you're looking for.
              </p>
            </div>
          )}

          {searchError && (
             <div className="flex flex-col items-center justify-center py-20 text-center">
               <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-full mb-4">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-red-500">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                 </svg>
               </div>
               <h3 className="text-[var(--foreground)] text-lg font-semibold">Something went wrong</h3>
               <p className="text-red-500/80 max-w-xs mt-2">{searchError}</p>
             </div>
          )}
        </div>
      </SlideOver>

      {/* Footer */}
      <footer className="w-full py-8 mt-auto border-t border-[var(--border)] bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[var(--muted-foreground)] text-sm">
            &copy; {new Date().getFullYear()} LegalSearch AI. For demonstration purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
}
