import type { ReactNode } from "react";

export function Marquee({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`group relative flex w-full overflow-hidden ${className}`}>
      <div className="marquee group-hover:[animation-play-state:paused] flex shrink-0 items-center gap-16 pr-16">
        {children}
      </div>
      <div aria-hidden className="marquee group-hover:[animation-play-state:paused] flex shrink-0 items-center gap-16 pr-16">
        {children}
      </div>
    </div>
  );
}
