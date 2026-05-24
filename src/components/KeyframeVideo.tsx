import { useEffect, useRef, useState } from "react";

interface KeyframeVideoProps {
  activeSection: string;
  variant?: "card" | "background";
}

export default function KeyframeVideo({ activeSection, variant = "card" }: KeyframeVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollTargetRef = useRef(0);
  const currentScrollRef = useRef(0);

  const [progressPct, setProgressPct] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Synchronize scroll position with video scrubbing frame
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const rawProgress = scrollTop / docHeight;
      const speedMultiplier = 0.7; // Accelerate playback so video completes by the time they scroll past early sections
      scrollTargetRef.current = Math.min(1.0, rawProgress * speedMultiplier);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initialize immediately
    handleScroll();

    let animationFrameId: number;

    const updateVideoScrub = () => {
      // Eased smooth interpolation for cinematic inertia (shock absorber for rapid scrolls)
      const diff = scrollTargetRef.current - currentScrollRef.current;
      currentScrollRef.current += diff * 0.07; // Highly tuned dampening factor for maximum smoothness

      const video = videoRef.current;
      if (video && video.duration && !isNaN(video.duration)) {
        if (!isReady) setIsReady(true);
        setDuration(video.duration);

        const targetTime = currentScrollRef.current * video.duration;
        // Clamp seek target within safe playable bounds to prevent blank frames
        const clampedTime = Math.min(Math.max(0, targetTime), video.duration - 0.05);

        // CRITICAL PERFORMANCE GUARD: Only assign currentTime if the video decoder is not currently seeking.
        // This prevents the browser's decode pipeline from choking under high-speed scroll events.
        if (!video.seeking) {
          video.currentTime = clampedTime;
        }

        setCurrentTime(clampedTime);
        setProgressPct(currentScrollRef.current * 100);
      }

      animationFrameId = requestAnimationFrame(updateVideoScrub);
    };

    animationFrameId = requestAnimationFrame(updateVideoScrub);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isReady]);

  // Handle manual metadata loading
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      setDuration(video.duration);
      setIsReady(true);
    }
  };

  if (variant === "background") {
    return (
      <div ref={containerRef} className="w-full h-full relative overflow-hidden">
        <video
          ref={videoRef}
          src="/0524.mov"
          preload="auto"
          muted
          playsInline
          onLoadedMetadata={handleLoadedMetadata}
          className="w-full h-full object-cover pointer-events-none"
          style={{ objectPosition: "center 22%" }}
        />
        <div className="absolute inset-0 bg-white/85 pointer-events-none" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative flex flex-col items-center justify-center select-none group"
    >
      {/* Premium Glassmorphic Card Container */}
      <div className="w-full max-w-sm aspect-[9/16] relative overflow-hidden rounded-[2.5rem] border border-stone-200/80 bg-white/40 backdrop-blur-xl shadow-2xl p-4 flex flex-col justify-between transition-all duration-500 hover:shadow-[0_24px_60px_rgba(0,0,0,0.08)]">

        {/* Frame Header: Cyberpunk Viewfinder Detail */}
        <div className="flex justify-between items-center px-2 py-1 font-mono text-[9px] text-stone-500 tracking-wider border-b border-stone-100 pb-3 select-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-stone-800 tracking-widest">CAPTURA VIVA &mdash; J. BRITO</span>
          </div>
          <span className="text-[8px] bg-stone-100/80 text-stone-600 px-2 py-0.5 rounded font-bold uppercase border border-stone-200/40">
            {activeSection === "hero" ? "CAP. 1" :
              activeSection === "builder" ? "CAP. 2" :
                activeSection === "foundation" ? "CAP. 3" :
                  activeSection === "discipline" ? "CAP. 4" : "CAP. 5"}
          </span>
        </div>

        {/* Cinematic Video Content Area */}
        <div className="relative flex-1 my-4 overflow-hidden rounded-[1.75rem] bg-stone-50 border border-stone-150/70 shadow-inner group-hover:border-stone-300/45 transition-colors">
          <video
            ref={videoRef}
            src="/0524.mov"
            preload="auto"
            muted
            playsInline
            onLoadedMetadata={handleLoadedMetadata}
            className="w-full h-full object-cover pointer-events-none filter brightness-[1.03] contrast-[1.01] transition-all duration-300"
          />

          {/* Stylized camera focus brackets */}
          <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t-2 border-l-2 border-white/50 rounded-tl-sm pointer-events-none" />
          <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t-2 border-r-2 border-white/50 rounded-tr-sm pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b-2 border-l-2 border-white/50 rounded-bl-sm pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b-2 border-r-2 border-white/50 rounded-br-sm pointer-events-none" />

          {/* Central Target Reticle */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
            <div className="w-6 h-6 border border-white rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>
          </div>

          {/* Bottom active section tag overlay */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-mono font-bold text-stone-850 tracking-wider shadow-sm uppercase border border-stone-200/20">
            SEÇÃO: {activeSection}
          </div>
        </div>

        {/* Dynamic Frame Analytics Tray */}
        <div className="flex flex-col gap-2.5 font-mono text-[9px] text-stone-500 px-1 border-t border-stone-100 pt-3">
          <div className="flex justify-between items-center">
            <span className="tracking-wide">INDICE TEMPORAL</span>
            <span className="text-stone-900 font-bold tracking-tight">
              {currentTime.toFixed(2)}s / {duration > 0 ? `${duration.toFixed(2)}s` : "--"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="tracking-wide">DESLOCAMENTO VIRTUAL</span>
            <span className="text-stone-900 font-semibold tracking-tight">{Math.round(progressPct)}%</span>
          </div>

          {/* Luxury Scrub Track bar */}
          <div className="w-full h-1 bg-stone-100 rounded-full overflow-hidden relative">
            <div
              className="bg-stone-900 h-full transition-all duration-75 ease-out rounded-full"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
