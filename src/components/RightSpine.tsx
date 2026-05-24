import { SECTIONS } from "../types";

interface RightSpineProps {
  activeSection: string;
}

export default function RightSpine({ activeSection }: RightSpineProps) {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hidden md:flex fixed top-0 right-0 h-screen w-16 z-40 flex-col justify-center items-center gap-6 pointer-events-none select-none">
      {/* Scroll trackers with vertical lines */}
      <div className="flex flex-col items-center gap-4 py-8 pointer-events-auto">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              id={`tracker-btn-${sec.id}`}
              key={sec.id}
              onClick={() => handleScrollTo(sec.id)}
              className="group flex flex-col items-center gap-1 focus:outline-none"
              title={`Secção ${sec.num}: ${sec.title}`}
            >
              {/* Highlight number */}
              <span
                className={`text-[10px] font-mono tracking-tighter transition-all duration-300 ${
                  isActive ? "text-stone-900 scale-110 font-bold" : "text-muted-foreground group-hover:text-stone-950"
                }`}
              >
                {sec.num}
              </span>
              
              {/* Vertical dash */}
              <div
                className={`h-4 w-[2px] rounded-full transition-all duration-300 ${
                  isActive ? "bg-stone-900 h-6" : "bg-stone-200 group-hover:bg-stone-400"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
