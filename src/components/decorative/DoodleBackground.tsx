import { DoodleAccent } from "@/components/decorative/DoodleAccent";

const doodles = [
  { variant: "star", color: "#D6B347", size: 96, className: "left-[4%] top-[7%] -rotate-12 opacity-[0.10]" },
  { variant: "circle", color: "#6F9D9A", size: 118, className: "right-[6%] top-[12%] rotate-6 opacity-[0.09]" },
  { variant: "squiggle", color: "#B8A7CC", size: 128, className: "left-[20%] top-[24%] rotate-3 opacity-[0.08]" },
  { variant: "dot-cluster", color: "#D98B73", size: 88, className: "right-[18%] top-[31%] -rotate-6 opacity-[0.09]" },
  { variant: "x", color: "#9FAF6F", size: 72, className: "left-[7%] top-[42%] rotate-12 opacity-[0.08]" },
  { variant: "arrow", color: "#D6B347", size: 112, className: "right-[9%] top-[49%] -rotate-12 opacity-[0.08]" },
  { variant: "circle", color: "#D98B73", size: 160, className: "left-[28%] top-[58%] rotate-12 opacity-[0.06]" },
  { variant: "star", color: "#6F9D9A", size: 132, className: "right-[26%] top-[68%] -rotate-6 opacity-[0.08]" },
  { variant: "squiggle", color: "#D6B347", size: 176, className: "left-[5%] top-[78%] -rotate-3 opacity-[0.07]" },
  { variant: "dot-cluster", color: "#B8A7CC", size: 120, className: "right-[5%] top-[86%] rotate-6 opacity-[0.08]" },
  { variant: "x", color: "#D98B73", size: 104, className: "left-[46%] top-[10%] rotate-6 opacity-[0.06]" },
  { variant: "arrow", color: "#9FAF6F", size: 144, className: "left-[55%] top-[37%] rotate-12 opacity-[0.07]" },
  { variant: "dot-cluster", color: "#D6B347", size: 74, className: "left-[14%] top-[15%] rotate-6 opacity-[0.08]" },
  { variant: "arrow", color: "#D98B73", size: 92, className: "right-[30%] top-[6%] rotate-12 opacity-[0.07]" },
  { variant: "circle", color: "#B8A7CC", size: 84, className: "left-[35%] top-[18%] -rotate-12 opacity-[0.07]" },
  { variant: "star", color: "#9FAF6F", size: 68, className: "right-[43%] top-[23%] rotate-3 opacity-[0.08]" },
  { variant: "squiggle", color: "#D98B73", size: 108, className: "right-[3%] top-[27%] -rotate-6 opacity-[0.07]" },
  { variant: "x", color: "#6F9D9A", size: 58, className: "left-[52%] top-[29%] -rotate-12 opacity-[0.08]" },
  { variant: "star", color: "#B8A7CC", size: 86, className: "left-[12%] top-[34%] rotate-12 opacity-[0.07]" },
  { variant: "circle", color: "#D6B347", size: 126, className: "right-[35%] top-[41%] rotate-6 opacity-[0.06]" },
  { variant: "dot-cluster", color: "#9FAF6F", size: 98, className: "left-[36%] top-[47%] -rotate-3 opacity-[0.07]" },
  { variant: "squiggle", color: "#6F9D9A", size: 142, className: "right-[20%] top-[55%] rotate-3 opacity-[0.07]" },
  { variant: "arrow", color: "#B8A7CC", size: 104, className: "left-[17%] top-[63%] -rotate-12 opacity-[0.07]" },
  { variant: "x", color: "#D6B347", size: 76, className: "right-[42%] top-[62%] rotate-12 opacity-[0.08]" },
  { variant: "star", color: "#D98B73", size: 112, className: "left-[58%] top-[72%] -rotate-6 opacity-[0.07]" },
  { variant: "circle", color: "#9FAF6F", size: 96, className: "left-[18%] top-[83%] rotate-6 opacity-[0.07]" },
  { variant: "dot-cluster", color: "#6F9D9A", size: 78, className: "right-[36%] top-[80%] -rotate-12 opacity-[0.08]" },
  { variant: "arrow", color: "#D6B347", size: 128, className: "left-[42%] top-[89%] rotate-12 opacity-[0.06]" },
  { variant: "squiggle", color: "#B8A7CC", size: 118, className: "right-[16%] top-[92%] -rotate-3 opacity-[0.07]" },
  { variant: "x", color: "#D98B73", size: 62, className: "left-[72%] top-[14%] rotate-12 opacity-[0.08]" },
  { variant: "circle", color: "#6F9D9A", size: 70, className: "left-[64%] top-[45%] -rotate-6 opacity-[0.07]" },
  { variant: "star", color: "#D6B347", size: 78, className: "right-[8%] top-[66%] rotate-3 opacity-[0.08]" },
  { variant: "dot-cluster", color: "#B8A7CC", size: 64, className: "left-[31%] top-[76%] rotate-12 opacity-[0.08]" },
  { variant: "arrow", color: "#9FAF6F", size: 88, className: "right-[48%] top-[74%] -rotate-12 opacity-[0.07]" },
  { variant: "squiggle", color: "#D98B73", size: 154, className: "left-[68%] top-[84%] rotate-6 opacity-[0.06]" },
  { variant: "x", color: "#B8A7CC", size: 84, className: "right-[14%] top-[38%] rotate-12 opacity-[0.07]" },
] as const;

export function DoodleBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden md:block" aria-hidden="true">
      {doodles.map((doodle, index) => (
        <div key={index} className={`absolute ${doodle.className}`}>
          <DoodleAccent variant={doodle.variant} color={doodle.color} size={doodle.size} />
        </div>
      ))}
    </div>
  );
}
