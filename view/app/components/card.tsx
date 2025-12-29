import Image from "next/image";

type Document = {
  id: number;
  category: string;
  title: string;
  description: string;
  updatedAt: string;
  imageUrl: string;
};

type DocumentCardProps = Document & {
  onGenerateSummary: (title: string) => void;
};

export const DocumentCard = (data: DocumentCardProps) => (
  <a
    href={`https://legal-doc-task.onrender.com/document/view?documentTitle=${data.title}`}
    target="_blank"
    rel="noreferrer"
    className="group-hover:text-[var(--primary)] transition-colors"
  >
    <div className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] bg-[var(--card)] border border-[var(--border)] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="h-48 w-full relative overflow-hidden">
        <Image
          src={data.imageUrl}
          alt={data.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/90 via-transparent to-transparent opacity-80" />

        <div className="absolute bottom-4 left-4 right-4 z-10">
          <span className="inline-flex items-center rounded-full bg-[var(--primary)]/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white mb-2 shadow-sm">
            {data.category}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1 relative">
        <h3 className="text-[var(--foreground)] text-lg font-bold leading-tight line-clamp-2">
          {data.title}
        </h3>

        <p className="text-[var(--muted-foreground)] text-sm leading-relaxed line-clamp-3">
          {data.description}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-[var(--border)]">
          <span className="text-xs text-[var(--muted-foreground)] flex items-center gap-1.5 font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3.5 h-3.5 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                clipRule="evenodd"
              />
            </svg>
            {data.updatedAt}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              data.onGenerateSummary(data.title);
            }}
            className="text-[var(--primary)] text-sm font-semibold hover:opacity-80 transition-opacity flex items-center gap-1"
          >
            Generate Summary
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </a>
);
