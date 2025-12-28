import { useState } from "react";
import { useRouter } from "next/navigation";

export const Search = ({ onSearch }: { onSearch?: (query: string) => void }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const submitSearch = () => {
    const q = (inputValue || "").trim();
    if (onSearch) {
      onSearch(q);
    } else {
      const enc = encodeURIComponent(q);
      router.push(`/search?query=${enc}`);
    }
  };

  return (
    <div className="w-full max-w-5xl flex flex-col gap-10 mb-16 items-center text-center mx-auto">
      <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-5 duration-700">
        <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-[var(--accent)] text-[var(--primary)] text-xs font-bold uppercase tracking-wider mb-2 w-fit mx-auto">
          <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse"></span>
          AI-Powered Analysis
        </div>
        <h1 className="text-[var(--foreground)] text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
          Legal Document <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-purple-500">
            Search Portal
          </span>
        </h1>
        <p className="text-[var(--muted-foreground)] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Instantly search, analyze, and summarize complex legal documents with our advanced AI engine.
        </p>
      </div>

      <div className="w-full max-w-3xl transform transition-all duration-300">
        <div 
          className={`relative group flex w-full items-center p-2 rounded-[var(--radius-lg)] bg-[var(--card)] border shadow-sm transition-all duration-300 ${
            isFocused 
              ? "border-[var(--primary)] ring-4 ring-[var(--primary)]/10 shadow-xl scale-[1.01]" 
              : "border-[var(--border)] hover:border-[var(--muted-foreground)]/30"
          }`}
        >
          <div className="pl-4 text-[var(--muted-foreground)]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
          </div>
          
          <input
            type="text"
            className="w-full bg-transparent border-none text-[var(--foreground)] text-lg placeholder:text-[var(--muted-foreground)]/60 focus:ring-0 px-4 h-14"
            placeholder="Search for contracts, case files, or precedents..."
            value={inputValue}
            onChange={handleInput}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submitSearch();
              }
            }}
          />
          
          <button
            className="hidden md:flex h-12 px-6 items-center justify-center rounded-[calc(var(--radius-lg)-4px)] bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white text-base font-bold transition-all shadow-md hover:shadow-lg active:scale-95"
            onClick={submitSearch}
          >
            Search
          </button>
        </div>
        
        {/* Mobile Button (visible only on small screens) */}
        <button
          className="md:hidden mt-4 w-full h-14 rounded-[var(--radius-lg)] bg-[var(--primary)] text-white font-bold text-lg shadow-lg active:scale-95 transition-all"
          onClick={submitSearch}
        >
          Search Documents
        </button>
        
        <p className="mt-4 text-[var(--muted-foreground)] text-sm font-medium">
          Try searching for <button className="text-[var(--primary)] hover:underline" onClick={() => { setInputValue("NDA Agreement"); if(onSearch) onSearch("NDA Agreement"); }}>"NDA Agreement"</button> or <button className="text-[var(--primary)] hover:underline" onClick={() => { setInputValue("Corporate Bylaws"); if(onSearch) onSearch("Corporate Bylaws"); }}>"Corporate bylaws"</button>
        </p>
      </div>
    </div>
  );
};
