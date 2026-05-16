import { cn } from "@/lib/utils";

interface TapeFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  tapePosition?: "top" | "top-left" | "top-right" | "corners";
  tapeColor?: string;
}

export function TapeFrame({
  tapePosition = "top",
  tapeColor = "rgba(214, 179, 71, 0.35)",
  className,
  children,
  ...props
}: TapeFrameProps) {
  return (
    <div className={cn("relative", className)} {...props}>
      {tapePosition === "top" && (
        <div
          className="absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 -rotate-2 rounded-sm border border-black/10"
          style={{ backgroundColor: tapeColor }}
          aria-hidden="true"
        />
      )}
      {tapePosition === "top-left" && (
        <div
          className="absolute -top-2 left-4 z-10 h-6 w-16 -rotate-6 rounded-sm border border-black/10"
          style={{ backgroundColor: tapeColor }}
          aria-hidden="true"
        />
      )}
      {tapePosition === "top-right" && (
        <div
          className="absolute -top-2 right-4 z-10 h-6 w-16 rotate-3 rounded-sm border border-black/10"
          style={{ backgroundColor: tapeColor }}
          aria-hidden="true"
        />
      )}
      {tapePosition === "corners" && (
        <>
          <div
            className="absolute -top-2 left-3 z-10 h-5 w-14 -rotate-6 rounded-sm border border-black/10"
            style={{ backgroundColor: tapeColor }}
            aria-hidden="true"
          />
          <div
            className="absolute -top-2 right-3 z-10 h-5 w-14 rotate-3 rounded-sm border border-black/10"
            style={{ backgroundColor: tapeColor }}
            aria-hidden="true"
          />
        </>
      )}
      {children}
    </div>
  );
}
