import { useState, useEffect, useRef } from "react";
import { SECTIONS } from "./types";
import KeyframeVideo from "./components/KeyframeVideo";
import FarLeftSpine from "./components/FarLeftSpine";
import RightSpine from "./components/RightSpine";
import ContactModal from "./components/ContactModal";
import ProjectHub from "./components/ProjectHub";
import { ArrowRight, ChevronRight, Check, Sparkles, Code2, Users, Flame, Heart, Cpu } from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isHubOpen, setIsHubOpen] = useState(false);

  // Set up intersection observer to detect active section dynamically on scroll
  useEffect(() => {
    const observers = SECTIONS.map((sec) => {
      const el = document.getElementById(sec.id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(sec.id);
          }
        },
        {
          root: null,
          rootMargin: "-45% 0px -45% 0px", // Trigger when section occupies the vertical center zone
          threshold: 0
        }
      );

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.el);
        }
      });
    };
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent font-sans text-stone-900 overflow-x-hidden selection:bg-stone-900 selection:text-white">

      {/* Global Fixed Video Background */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <KeyframeVideo activeSection={activeSection} variant="background" />
      </div>

      <div className="site-content relative z-10">
        {/* Clean Minimalism Sphere Glow Accent */}
        <div className="sphere-glow z-0 pointer-events-none opacity-80" />

        {/* Floating Elements / Spines Layer */}
        <FarLeftSpine
          onContactClick={() => setIsContactOpen(true)}
          onMenuClick={() => setIsHubOpen(true)}
        />
        <RightSpine activeSection={activeSection} />

        {/* Header element as requested by the brief */}
        <header className="relative z-30 w-full max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6 flex justify-between items-center selection:bg-stone-950 selection:text-white">
        {/* Brand Logo */}
        <div className="flex items-center gap-1">
          <span className="font-display text-2xl md:text-3xl tracking-tight text-stone-900 cursor-pointer select-none" onClick={() => handleScrollTo("hero")}>
            João Brito<sup className="text-xs ml-0.5 opacity-60">®</sup>
          </span>
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse ml-1.5 hidden sm:block" />
        </div>

        {/* Navigation Menu Links */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-[11px] uppercase tracking-widest text-stone-500 select-none">
          <button
            id="nav-link-home"
            onClick={() => handleScrollTo("hero")}
            className={`transition-colors hover:text-stone-900 cursor-pointer ${activeSection === "hero" ? "text-stone-900 font-bold" : "text-stone-400"}`}
          >
            Início
          </button>
          <button
            id="nav-link-studio"
            onClick={() => handleScrollTo("builder")}
            className={`transition-colors hover:text-stone-900 cursor-pointer ${activeSection === "builder" ? "text-stone-900 font-bold" : "text-stone-400"}`}
          >
            Estúdio
          </button>
          <button
            id="nav-link-about"
            onClick={() => handleScrollTo("foundation")}
            className={`transition-colors hover:text-stone-900 cursor-pointer ${activeSection === "foundation" ? "text-stone-900 font-bold" : "text-stone-400"}`}
          >
            Sobre Mim
          </button>
          <button
            id="nav-link-journal"
            onClick={() => handleScrollTo("discipline")}
            className={`transition-colors hover:text-stone-900 cursor-pointer ${activeSection === "discipline" ? "text-stone-900 font-bold" : "text-stone-400"}`}
          >
            Disciplina
          </button>
          <button
            id="nav-link-reach"
            onClick={() => handleScrollTo("invitation")}
            className={`transition-colors hover:text-stone-900 cursor-pointer ${activeSection === "invitation" ? "text-stone-900 font-bold" : "text-stone-400"}`}
          >
            Contacto
          </button>
        </nav>

        {/* Nav CTA */}
        <button
          id="nav-cta-btn"
          onClick={() => setIsContactOpen(true)}
          className="liquid-glass rounded-full px-4 md:px-6 py-2 text-xs uppercase tracking-widest font-mono text-stone-900 hover:scale-[1.03] transition-transform cursor-pointer border-none"
        >
          Iniciar
        </button>
      </header>

      {/* Main Grid Content */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 selection:bg-white selection:text-black">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start min-h-screen">
          
          {/* Left Hemisphere: Story scrolling column */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-16 md:gap-24 pt-8 md:pt-16 pr-0 lg:pr-8 pl-0 md:pl-20 pb-20">
            
            {/* Section 1: Hero chapter */}
            <section
              id="hero"
              className="relative min-h-[80vh] flex flex-col justify-center items-start text-left pt-12 md:pt-20 scroll-mt-24 overflow-hidden"
            >

              {/* Content Wrapper */}
              <div className="relative z-10 w-full">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-600 font-bold mb-4 animate-fade-rise inline-block">
                  CAPÍTULO I &mdash; APRESENTAÇÃO
                </span>
                
                <h1 className="font-display text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-2xl font-normal text-stone-900 animate-fade-rise">
                  João Brito.<br/>
                  <em className="not-italic text-stone-400">Onde os sonhos se erguem no silêncio.</em>
                </h1>

                <p className="text-stone-600 text-sm sm:text-base max-w-lg mt-8 leading-relaxed font-sans animate-fade-rise-delay">
                  Desenvolvo soluções digitais para pensadores audazes e mentes focadas. 
                  No coração de Lisboa, crio arquiteturas de software elegantes e de alta performance, impulsionado por uma fé sólida e uma disciplina inabalável.
                </p>

                <div className="flex flex-wrap items-center gap-4 mt-12 animate-fade-rise-delay-2 w-full pb-10">
                  <button
                    id="hero-cta-begin"
                    onClick={() => handleScrollTo("builder")}
                    className="liquid-glass rounded-full px-10 py-4 text-xs uppercase tracking-widest font-mono text-stone-900 hover:scale-[1.03] transition-transform flex items-center gap-2 cursor-pointer border-none"
                  >
                    Explorar o Meu Trabalho <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                  </button>
                  <button
                    id="hero-sub-btn"
                    onClick={() => setIsHubOpen(true)}
                    className="px-6 py-4 text-xs font-mono tracking-widest text-stone-500 hover:text-stone-900 transition-colors uppercase"
                  >
                    Índice Técnico de Projetos
                  </button>
                </div>
              </div>
            </section>

            {/* Section 2: The Builder (Engineering & Tech) */}
            <section
              id="builder"
              className="min-h-[75vh] flex flex-col justify-center items-start text-left scroll-mt-24"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-widest border border-emerald-500/20 text-emerald-600 rounded-full">
                  O CONSTRUTOR
                </span>
                <span className="text-[10px] font-mono text-stone-400">CAPÍTULO 02</span>
              </div>
              
              <h2 className="font-display text-4xl sm:text-6xl text-stone-900 tracking-wide leading-tight">
                Precisão em Tudo.<br/>
                <span className="text-stone-400">Orquestração analítica na Deloitte.</span>
              </h2>

              <p className="text-stone-600 text-sm sm:text-base mt-6 leading-relaxed max-w-lg font-sans">
                Sou um estudante de Engenharia Eletrotécnica de 21 anos em Portugal, com uma obsessão pela forma como os sistemas se conectam &mdash; desde circuitos analógicos integrados até interfaces digitais fluidas e reativas. Fundo uma mentalidade profissional de consultoria e auditoria na Deloitte com um desenvolvimento meticuloso e rigoroso.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 w-full">
                <div className="bg-stone-50 border border-stone-100 p-4 rounded-xl hover:border-emerald-500/25 transition-colors">
                  <div className="flex items-center gap-1.5 text-stone-900 font-semibold mb-1.5 text-xs font-mono">
                    <Cpu className="w-3.5 h-3.5 text-emerald-600" />
                    ENGENHARIA ELETROTÉCNICA
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    Investigação académica, modelação e simulação de circuitos de corrente e análise de transitórios com integridade física.
                  </p>
                </div>

                <div className="bg-stone-50 border border-stone-100 p-4 rounded-xl hover:border-emerald-500/25 transition-colors">
                  <div className="flex items-center gap-1.5 text-stone-900 font-semibold mb-1.5 text-xs font-mono">
                    <Code2 className="w-3.5 h-3.5 text-emerald-600" />
                    ARQUITETURA DIGITAL
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    Desenvolvimento de interfaces modernas e algoritmos visuais que respondem com alto dinamismo recorrendo a React e APIs.
                  </p>
                </div>
              </div>

              <button
                id="builder-hub-btn"
                onClick={() => setIsHubOpen(true)}
                className="mt-8 text-xs font-mono font-bold tracking-widest text-emerald-600 hover:text-stone-900 uppercase flex items-center gap-1 transition-colors cursor-pointer"
              >
                VER PORTFÓLIO E ACADEMIA <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </section>

            {/* Section 3: The Foundation (Faith & Community) */}
            <section
              id="foundation"
              className="min-h-[75vh] flex flex-col justify-center items-start text-left scroll-mt-24"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-widest border border-sky-400/20 text-sky-600 rounded-full">
                  A FUNDAÇÃO
                </span>
                <span className="text-[10px] font-mono text-stone-400">CAPÍTULO 03</span>
              </div>

              <h2 className="font-display text-4xl sm:text-6xl text-stone-900 tracking-wide leading-tight">
                Guiado por Propósito.<br/>
                <span className="text-stone-400">Missão e evangelização em Lisboa.</span>
              </h2>

              <p className="text-stone-600 text-sm sm:text-base mt-6 leading-relaxed max-w-lg font-sans">
                O verdadeiro poder não se limita a código compilado ou resistências físicas; reside na verdade partilhada. A minha jornada apoia-se firmemente na fé cristã. É comum encontrar-me nas ruas históricas de Lisboa a partilhar o Evangelho e a dialogar abertamente com pessoas de todos os quadrantes socioculturais. Adicionalmente, dedico tempo ao ensino prático de português para imigrantes e estrangeiros, auxiliando-os no processo de integração cultural.
              </p>

              <div className="mt-8 bg-stone-50 border border-stone-100 rounded-xl p-4 flex flex-col gap-3 w-full">
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">Atividades Locais Contínuas</span>
                <div className="flex justify-between items-center text-xs text-stone-800 pb-2 border-b border-stone-100 font-mono">
                  <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-sky-600" /> Evangelismo de Rua</span>
                  <span className="text-stone-500">Baixa-Chiado & Rossio</span>
                </div>
                <div className="flex justify-between items-center text-xs text-stone-800 font-mono">
                  <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-sky-600" /> Apoio de Língua Portuguesa</span>
                  <span className="text-stone-500">Integração Cultural</span>
                </div>
              </div>
            </section>

            {/* Section 4: The Discipline (Fitness & Mindset) */}
            <section
              id="discipline"
              className="min-h-[75vh] flex flex-col justify-center items-start text-left scroll-mt-24"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-widest border border-red-500/20 text-red-600 rounded-full">
                  A DISCIPLINA
                </span>
                <span className="text-[10px] font-mono text-stone-400">CAPÍTULO 04</span>
              </div>

              <h2 className="font-display text-4xl sm:text-6xl text-stone-900 tracking-wide leading-tight">
                Força no Ferro.<br/>
                <span className="text-stone-400">Superando a fasquia de 140kg no supino.</span>
              </h2>

              <p className="text-stone-600 text-sm sm:text-base mt-6 leading-relaxed max-w-lg font-sans">
                A mente projeta conceitos brilhantes, mas o corpo precisa de energia e perseverança para executá-los sob extrema tensão. O treino físico de força é o meu crisol de disciplina diária. Levantar 140kg no supino é mais do que uma métrica mecânica — é a prova empírica de que a paciência, consistência e esforço intencional moldam o foco. Esta tenacidade reflete-se diretamente nos meus estudos e na qualidade do meu código.
              </p>

              <div className="mt-8 flex gap-6 items-center flex-wrap">
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-mono text-stone-400 uppercase">Recorde Pessoal de Supino</span>
                  <span className="font-display text-5xl text-red-600 leading-none mt-1">140<sup className="text-xl">KG</sup></span>
                  <span className="text-[10px] font-mono text-stone-400 uppercase mt-1">Aço sólido e controlo</span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-mono text-stone-400 uppercase">Consistência de Hábitos</span>
                  <span className="font-display text-5xl text-stone-900 leading-none mt-1">100<sup className="text-xl">%</sup></span>
                  <span className="text-[10px] font-mono text-stone-400 uppercase mt-1">Foco Diário Sem Atalhos</span>
                </div>
              </div>
            </section>

            {/* Section 5: The Invitation (CTA / Form Link) */}
            <section
              id="invitation"
              className="min-h-[80vh] flex flex-col justify-center items-start text-left pb-20 scroll-mt-24"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-widest border border-amber-500/20 text-amber-600 rounded-full">
                  O CONVITE
                </span>
                <span className="text-[10px] font-mono text-stone-400">CAPÍTULO 05</span>
              </div>

              <h2 className="font-display text-5xl sm:text-7xl text-stone-900 tracking-normal leading-[0.95] max-w-xl">
                Vamos Construir Algo Excecional.
              </h2>

              <p className="text-stone-600 text-sm sm:text-base mt-6 leading-relaxed max-w-lg font-sans">
                Se te sentes inspirado por este portfólio digital e procuras estruturar um espaço de marca premium para as tuas próprias ideias, ou pretendes dialogar sobre engenharia, fé e preparação física: a minha caixa de correio está sempre de portas abertas.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full max-w-md">
                <button
                  id="invitation-contact-btn"
                  onClick={() => setIsContactOpen(true)}
                  className="px-8 py-4 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-stone-950 text-white hover:bg-stone-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer border-none animate-pulse"
                >
                  Iniciar Conversa
                </button>
                <a
                  id="invitation-ig-btn"
                  href="https://www.instagram.com/joao.brito_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-glass px-8 py-4 rounded-full text-xs font-mono font-bold uppercase tracking-widest text-stone-800 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 border-none"
                >
                  Mensagem Direta (Instagram)
                </a>
              </div>
            </section>

          </div>

        </div>
      </main>

      {/* Floating Bottom Navigator Tray for Mobile Devices */}
      <div className="fixed bottom-6 inset-x-0 z-40 px-4 md:hidden flex justify-center pointer-events-none">
        <div className="liquid-glass rounded-full bg-white/95 shadow-[0_12px_40px_rgba(0,0,0,0.12)] px-6 py-3 flex items-center justify-between gap-6 pointer-events-auto border border-stone-200/50 backdrop-blur-xl">
          <button
            onClick={() => handleScrollTo("hero")}
            className="flex flex-col items-center gap-0.5 text-stone-500 hover:text-stone-900 focus:outline-none transition-colors"
          >
            <span className="text-[10px] font-mono tracking-wider font-bold">INÍCIO</span>
          </button>
          
          <div className="w-[1px] h-3.5 bg-stone-200" />
          
          <button
            onClick={() => setIsHubOpen(true)}
            className="flex flex-col items-center gap-0.5 text-stone-500 hover:text-stone-900 focus:outline-none transition-colors"
          >
            <span className="text-[10px] font-mono tracking-wider font-bold text-stone-800">PROJETOS</span>
          </button>
          
          <div className="w-[1px] h-3.5 bg-stone-200" />
          
          <button
            onClick={() => setIsContactOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-stone-950 text-white rounded-full text-[10px] font-mono tracking-widest font-bold hover:bg-stone-800 transition-colors"
          >
            <span>CONVERSAR</span>
          </button>
        </div>
      </div>

      {/* Slideout Modals Layer */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
      <ProjectHub
        isOpen={isHubOpen}
        onClose={() => setIsHubOpen(false)}
        onContactClick={() => setIsContactOpen(true)}
      />
      </div>

    </div>
  );
}
