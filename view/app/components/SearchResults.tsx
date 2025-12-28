import React from "react";

type SearchResultsData = {
  id: number;
  content: string;
};

type SearchResult = {
  title: string;
  data: SearchResultsData;
};

export const SearchResults = ({ results }: { results: SearchResult[] }) => {
  const [expandedId, setExpandedId] = React.useState<number | null>(null);

  if (!results || results.length === 0) {
    return null;
  }

  const truncateText = (text: string, chars: number = 150) => {
    if (text.length > chars) {
      return text.substring(0, chars) + "...";
    }
    return text;
  };

  return (
    <div className="w-full mt-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[var(--foreground)] text-2xl font-bold tracking-tight">
          Search Results 
          <span className="ml-2 text-[var(--muted-foreground)] text-lg font-medium">({results.length})</span>
        </h2>
      </div>
      
      <div className="flex flex-col gap-4 pb-10">
        {results.map((result, index) => {
          const isExpanded = expandedId === result.data.id;

          return (
            <div
              key={result.data.id || index}
              className={`group flex flex-col rounded-[var(--radius-lg)] border bg-[var(--card)] transition-all duration-300 ${
                isExpanded 
                  ? "border-[var(--primary)] shadow-lg ring-1 ring-[var(--primary)]/10" 
                  : "border-[var(--border)] hover:border-[var(--primary)]/50 hover:shadow-md"
              }`}
            >
              {/* Main Card */}
              <div 
                className="flex items-start gap-4 p-5 cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : result.data.id)}
              >
                {/* Icon Badge */}
                <div className="flex-shrink-0 mt-1">
                  <div className={`p-2.5 rounded-[var(--radius-md)] transition-colors ${
                    isExpanded 
                      ? "bg-[var(--primary)] text-white shadow-md" 
                      : "bg-[var(--accent)] text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white"
                  }`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[var(--primary)] text-xs font-bold uppercase tracking-wide">
                      Document #{result.data.id}
                    </p>
                    <span className="text-[var(--muted-foreground)] transition-transform duration-300">
                     {isExpanded ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 rotate-180">
                          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                      )}
                    </span>
                  </div>
                  
                  <h3 className="text-[var(--foreground)] font-semibold text-lg mb-1">
                    {result.title || "Legal Document Extract"}
                  </h3>
                  
                  <p className="text-[var(--muted-foreground)] text-sm leading-relaxed line-clamp-2">
                    {isExpanded ? "" : truncateText(result.data.content, 140)}
                  </p>
                </div>
              </div>

              {/* Expanded Content Section */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-0 animate-in fade-in zoom-in-95 duration-300 origin-top">
                  <div className="bg-[var(--muted)]/50 rounded-[var(--radius-md)] p-4 border border-[var(--border)]">
                    <p className="text-[var(--foreground)] text-sm leading-7 font-sans whitespace-pre-wrap">
                      {result.data.content}
                    </p>
                  </div>
                  <div className="mt-4 flex gap-2 justify-end">
                    <button className="inline-flex items-center gap-2 text-[var(--primary)] hover:text-white hover:bg-[var(--primary)] px-4 py-2 rounded-[var(--radius-md)] text-sm font-semibold transition-all border border-transparent hover:border-[var(--primary)]">
                       View Full Document
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                         <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                       </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
