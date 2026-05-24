import { X, ExternalLink, Code, Layers, MessageSquare, Flame, CheckCircle, BrainCircuit } from "lucide-react";
import { PROJECTS, CHURCH_TIMELINE, TECH_SKILLS } from "../types";

interface ProjectHubProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick: () => void;
}

export default function ProjectHub({ isOpen, onClose, onContactClick }: ProjectHubProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-stone-950/20 backdrop-blur-md z-50 flex justify-end selection:bg-stone-950 selection:text-white select-none">
      {/* Sliding sidebar block */}
      <div className="w-full max-w-2xl bg-white border-l border-stone-100 h-full overflow-y-auto flex flex-col p-6 md:p-10 text-left animate-fade-rise duration-300">
        
        {/* Header toolbar */}
        <div className="flex justify-between items-center border-b border-stone-100 pb-6 mb-8">
          <div>
            <span className="font-mono text-[10px] text-emerald-600 tracking-widest uppercase">DIRETÓRIO GERAL DO SISTEMA</span>
            <h2 className="font-display text-4xl text-stone-900 tracking-wide mt-1">Habilidades & Projetos</h2>
          </div>
          <button
            id="hub-close-btn"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-all cursor-pointer"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Technical Competencies Grid */}
        <div className="mb-10">
          <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">NÍVEIS DE CAPACIDADE DE EXECUÇÃO</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {TECH_SKILLS.map((skill) => (
              <div key={skill.name} className="bg-stone-50 border border-stone-100/70 hover:border-stone-200 rounded-xl p-4 flex flex-col gap-2 relative overflow-hidden group transition-colors">
                <div className="flex justify-between items-start">
                  <span className="text-stone-900 text-xs font-semibold">{skill.name}</span>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold">{skill.level}%</span>
                </div>
                {/* Simulated capacity level bar */}
                <div className="w-full bg-stone-200 h-1 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full transition-all duration-1000" style={{ width: `${skill.level}%` }} />
                </div>
                <p className="text-[10px] text-stone-500 font-mono leading-relaxed">{skill.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Deloitte & Web Systems Grid */}
        <div className="mb-10">
          <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">CONTRATOS E INOVAÇÃO DIGITAL</span>
          <div className="flex flex-col gap-4 mt-4">
            {PROJECTS.map((p) => (
              <div key={p.title} className="bg-stone-50 border border-stone-100/75 hover:border-stone-200 rounded-xl p-4 flex flex-col gap-2 md:flex-row md:justify-between transition-colors">
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-stone-900 font-semibold text-sm font-sans">{p.title}</span>
                    <span className="text-[9px] font-mono text-sky-600 border border-sky-400/20 px-1.5 py-0.5 rounded uppercase font-medium">{p.category}</span>
                  </div>
                  <p className="text-xs text-stone-500 leading-relaxed font-sans">{p.description}</p>
                  
                  {/* Technology Tags */}
                  <div className="flex gap-2 flex-wrap mt-3">
                    {p.tech.map((t) => (
                      <span key={t} className="text-[9px] font-mono text-stone-600 bg-stone-200/50 px-2.5 py-0.5 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-end justify-between md:flex-col md:items-end md:justify-center border-t border-stone-100 md:border-t-0 pt-3 md:pt-0 mt-3 md:mt-0">
                  <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">MÉTRICA</span>
                  <span className="text-xs text-stone-900 font-mono font-bold mt-1">{p.metrics}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Faith Ministry Timetable */}
        <div className="mb-10">
          <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">MISSÃO, DIÁLOGO DE RUA E LÍNGUAS</span>
          <div className="border-l border-stone-200 ml-2 mt-4 pl-6 flex flex-col gap-6 text-left">
            {CHURCH_TIMELINE.map((evt) => (
              <div key={evt.title} className="relative group">
                {/* Absolute chronological indicator dot */}
                <div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-sky-500 border border-white group-hover:bg-stone-900 transition-all" />
                <span className="text-[10px] font-mono text-sky-600 font-bold uppercase">{evt.year} &mdash; {evt.location}</span>
                <p className="text-sm font-semibold text-stone-900 mt-0.5">{evt.title}</p>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed font-sans">{evt.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner inside footer hub */}
        <div className="mt-auto pt-6 border-t border-stone-100 bg-stone-50 -mx-6 px-6 md:-mx-10 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-xs text-stone-900 font-bold font-sans">Inspirado por este portfólio digital diferenciado?</p>
            <p className="text-[10px] text-stone-500 font-mono">Deseja colaborar profissionalmente ou estabelecer um contacto comunitário?</p>
          </div>
          <button
            id="hub-contact-trigger-btn"
            onClick={() => {
              onClose();
              onContactClick();
            }}
            className="rounded-full px-5 py-2 text-xs font-mono font-bold uppercase tracking-widest bg-stone-950 text-white hover:bg-stone-800 transition-all cursor-pointer shadow-sm"
          >
            FALAR COMIGO
          </button>
        </div>

      </div>
    </div>
  );
}
