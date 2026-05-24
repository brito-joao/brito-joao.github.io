import { Instagram, Linkedin, Mail, AlignLeft, ShieldCheck, Heart } from "lucide-react";

interface FarLeftSpineProps {
  onContactClick: () => void;
  onMenuClick: () => void;
}

export default function FarLeftSpine({ onContactClick, onMenuClick }: FarLeftSpineProps) {
  return (
    <div className="hidden md:flex fixed top-0 left-0 h-screen w-20 border-r border-border bg-background/30 backdrop-blur-md z-40 flex-col justify-between items-center py-8 px-2 select-none">
      {/* Top Section: Elegant Menu Launcher Accent */}
      <button
        id="spine-menu-btn"
        onClick={onMenuClick}
        className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-black/5 transition-all duration-300 pointer-events-auto"
        title="Abrir Central de Projetos"
      >
        <AlignLeft className="w-5 h-5" />
      </button>

      {/* Middle Rotated Label: System state indicators */}
      <div className="hidden md:flex flex-col gap-1 items-center justify-center origin-center rotate-270 whitespace-nowrap text-[9px] font-mono tracking-widest text-muted-foreground select-none gap-4">
        <span className="flex items-center gap-1.5 uppercase hover:text-foreground transition-colors">
          <ShieldCheck className="w-3.5 h-3.5" /> Arquitetura Deloitte
        </span>
        <div className="w-6 h-[1px] bg-border" />
        <span className="uppercase">Lisboa, PT</span>
      </div>

      {/* Bottom Section: Social stack & branding link */}
      <div className="flex flex-col gap-6 items-center">
        {/* Instagram Link (Direct DM invitation) */}
        <a
          id="spine-instagram-link"
          href="https://www.instagram.com/joao.brito_"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-black/5 transition-all duration-300"
          title="Conetar no Instagram"
        >
          <Instagram className="w-4 h-4" />
        </a>

        {/* LinkedIn Connection */}
        <a
          id="spine-linkedin-link"
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-black/5 transition-all duration-300"
          title="Rede Profissional"
        >
          <Linkedin className="w-4 h-4" />
        </a>

        {/* Contact triggering button */}
        <button
          id="spine-contact-btn"
          onClick={onContactClick}
          className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-black/5 transition-all duration-300 pointer-events-auto"
          title="Enviar Mensagem Direta"
        >
          <Mail className="w-4 h-4" />
        </button>

        {/* Brand visual accent dot */}
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mt-2" title="Sistema Ativo" />
      </div>
    </div>
  );
}
