"use client";

import { useEffect, useState } from "react";

interface Section {
  id: string;
  title: string;
}

interface LegalTableOfContentsProps {
  sections: Section[];
}

export default function LegalTableOfContents({
  sections,
}: LegalTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -60% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
    }
  };

  return (
    <nav
      className="legal-toc hidden lg:block w-[285px] xl:w-[295px] shrink-0 sticky top-[96px] z-30 self-start"
      style={{
        position: "sticky",
        top: "96px",
        zIndex: 30,
        alignSelf: "flex-start",
      }}
      aria-label="Table of contents"
    >
      <div
        className="legal-toc-card rounded-2xl border border-[#E6D3B5] bg-white p-5 shadow-[0_4px_20px_rgba(95,78,59,0.06)]"
        style={{
          maxHeight: "calc(100vh - 125px)",
          overflowY: "auto",
        }}
      >
        <h3 className="legal-toc-title pb-2.5 mb-3 border-b border-[#F2E4D0] text-[11px] font-extrabold uppercase tracking-widest text-[#0B6971]">
          Table of Contents
        </h3>
        <ul className="legal-toc-list flex flex-col gap-1 m-0 p-0 list-none">
          {sections.map((section) => {
            const isActive = activeId === section.id;
            return (
              <li key={section.id} className="legal-toc-item list-none">
                <button
                  type="button"
                  onClick={() => scrollTo(section.id)}
                  className={`legal-toc-link w-full text-left font-inherit text-[13px] leading-snug py-2.5 px-3 rounded-lg border-l-[3px] flex items-center justify-between transition-all duration-150 cursor-pointer ${
                    isActive
                      ? "legal-toc-link--active text-[#0B6971] font-bold bg-[#EAF5F6] border-l-[#0B6971]"
                      : "text-[#6C5A45] border-l-transparent hover:text-[#0B6971] hover:bg-[#F7EFE3] hover:border-l-[#0B6971]/40"
                  }`}
                >
                  <span className="legal-toc-text flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
                    {section.title}
                  </span>
                  {isActive && (
                    <span
                      className="legal-toc-pointer shrink-0 text-[#0B6971] font-bold ml-1.5 inline-flex items-center"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
