import { cn } from "@/lib/utils";

interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function BentoGrid({ className, children, ...props }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
        "[&>*:nth-child(odd)]:rotate-[-0.3deg]",
        "[&>*:nth-child(even)]:rotate-[0.3deg]",
        "[&>*:nth-child(3n)]:translate-y-2",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface BentoItemProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
}

export function BentoItem({
  colSpan = 1,
  rowSpan = 1,
  className,
  children,
  ...props
}: BentoItemProps) {
  return (
    <div
      className={cn(
        colSpan === 1 && "md:col-span-1",
        colSpan === 2 && "md:col-span-2",
        colSpan === 3 && "md:col-span-3",
        rowSpan === 2 && "md:row-span-2",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
