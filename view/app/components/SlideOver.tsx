"use client";
import React from "react";
import { Alert, AlertStack } from "./Alert";

type SlideOverProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  statusMessage?: string;
  toastVariant?: "success" | "info" | "warning" | "error" | null;
};

export const SlideOver = ({ open, onClose, title, children, statusMessage, toastVariant }: SlideOverProps) => {
  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-50 overflow-hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      {/* Panel - Full Width, Half Height (or larger on mobile) */}
      <div
        role="dialog"
        aria-modal="true"
        className="absolute inset-x-0 bottom-0 flex max-h-screen"
      >
        <div
          className={`relative w-full border-t border-[var(--border)] bg-[var(--background)] shadow-2xl transform transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1) ${
            open ? "translate-y-0" : "translate-y-full"
          } h-screen sm:h-[80vh] flex flex-col rounded-t-[2rem]`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]">
            <h3 className="text-[var(--foreground)] text-xl font-bold truncate">{title || "Results"}</h3>
            <button
              onClick={onClose}
              className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] p-2 rounded-full transition-all"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {/* Body with Status Toast */}
          <div className="relative flex-1 bg-[var(--background)] overflow-y-auto px-6 py-6 custom-scrollbar">
            {/* Toast - Absolute inside Panel - Sticky to top (or just regular fixed elsewhere, keeping here as requested) */}
            <div className="fixed top-6 right-6 z-50 pointer-events-none">
              <AlertStack>
                {toastVariant && statusMessage && (
                  <div className="pointer-events-auto">
                    <Alert variant={toastVariant} message={statusMessage} />
                  </div>
                )}
              </AlertStack>
            </div>
            
            {/* Content Container */}
            <div className="max-w-7xl mx-auto h-full">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
