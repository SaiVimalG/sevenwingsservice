// Deprecated shim — embla-carousel-react was removed.
// Kept as no-op so any stale imports won't break the build. Use a CSS
// scroll-snap row instead. See src/routes/index.tsx mobile testimonials.
import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement> & { opts?: unknown };
export type CarouselApi = unknown;

export const Carousel = React.forwardRef<HTMLDivElement, Props>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={cn("relative", className)} {...rest}>
      {children}
    </div>
  ),
);
Carousel.displayName = "Carousel";

export const CarouselContent = React.forwardRef<HTMLDivElement, Props>(
  ({ className, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  ),
);
CarouselContent.displayName = "CarouselContent";

export const CarouselItem = React.forwardRef<HTMLDivElement, Props>(
  ({ className, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn("min-w-0 shrink-0 basis-full snap-start", className)}
      {...rest}
    >
      {children}
    </div>
  ),
);
CarouselItem.displayName = "CarouselItem";

export const CarouselPrevious = () => null;
export const CarouselNext = () => null;
