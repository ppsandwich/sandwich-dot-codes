import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  spacing?: "tight" | "default" | "loose";
}

export function Section({
  as: Component = "section",
  spacing = "default",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Component
      className={cn(
        spacing === "tight" && "py-8 md:py-12",
        spacing === "default" && "py-16 md:py-24",
        spacing === "loose" && "py-24 md:py-32",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
