import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Play, Pause, Dumbbell, Award, Flame, Languages, Cross, Sparkles, Volume2, CircuitBoard } from "lucide-react";

type WidgetMode = "bench" | "faith" | "circuits";

export default function InteractiveWidget({ onTriggerPulse }: { onTriggerPulse: () => void }) {
  const [mode, setMode] = useState<WidgetMode>("bench");
  
  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const [synthVolume, setSynthVolume] = useState(0.15);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Bench press state
  const [benchRep, setBenchRep] = useState(0);
  const [plateCount, setPlateCount] = useState(6); // 140kg typically around 6 plates of 20kg + 20kg bar
  const [liftStatus, setLiftStatus] = useState("Resting");

  // Faith Portuguese Translation module
  const portuguesesVerses = [
    { pt: "Estudo Engenharia, prego na rua e treino pesado.", en: "I study engineering, preach on the street, and train hard." },
    { pt: "Amparado pela fé em cada ligação elétrica.", en: "Supported by faith in every electrical connection." },
    { pt: "A consistência gera milagres no ferro e na alma.", en: "Consistency builds miracles in iron and soul." }
  ];
  const [verseIdx, setVerseIdx] = useState(0);

  // Initialize synth sound representing a digital filter circuit transient response
  const toggleSynth = () => {
    if (isPlaying) {
      if (oscRef.current) {
        oscRef.current.stop();
        oscRef.current.disconnect();
        oscRef.current = null;
      }
      setIsPlaying(false);
    } else {
      // Lazy init Web Audio API
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContextClass();
        }
        
        const audioCtx = audioCtxRef.current;
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        // Premium low frequency ambient hum (analog synthesizer warmth)
        osc.type = "sine";
        osc.frequency.setValueAtTime(110, audioCtx.currentTime); // A2 note, very warm
        
        // Low pass filter simulator
        const filter = audioCtx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(220, audioCtx.currentTime);

        gainNode.gain.setValueAtTime(synthVolume, audioCtx.currentTime);
        
        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.start();
        
        oscRef.current = osc;
        gainRef.current = gainNode;
        setIsPlaying(true);
        onTriggerPulse();
      } catch (err) {
        console.warn("Audio Context init blocked by browser permissions until user interaction");
      }
    }
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setSynthVolume(vol);
    if (gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.setValueAtTime(vol, audioCtxRef.current.currentTime);
    }
  };

  // Trigger high-pulse on bench-press click
  const handleLift = () => {
    setLiftStatus("Lifting...");
    onTriggerPulse();
    setBenchRep((r) => r + 1);
    
    setTimeout(() => {
      setLiftStatus("140kg Lift Successful!");
      setTimeout(() => setLiftStatus("Resting"), 1500);
    }, 700);
  };

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (oscRef.current) {
        try {
          oscRef.current.stop();
        } catch (_) {}
        oscRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="liquid-glass rounded-xl p-4 w-full max-w-sm border border-white/5 shadow-xl select-none text-left z-20 translate-y-0 transition-all duration-300">
      {/* Header Tabs */}
      <div className="flex border-b border-white/5 pb-2 mb-3 justify-between items-center text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
        <button
          id="widget-tab-bench"
          onClick={() => setMode("bench")}
          className={`flex items-center gap-1.5 pb-1 transition-colors ${mode === "bench" ? "text-white border-b border-white" : "hover:text-white"}`}
        >
          <Dumbbell className="w-3 h-3 text-red-400" />
          DISCIPLINE
        </button>
        <button
          id="widget-tab-faith"
          onClick={() => setMode("faith")}
          className={`flex items-center gap-1.5 pb-1 transition-colors ${mode === "faith" ? "text-white border-b border-white" : "hover:text-white"}`}
        >
          <Cross className="w-3 h-3 text-sky-400" />
          FOUNDATION
        </button>
        <button
          id="widget-tab-circuits"
          onClick={() => setMode("circuits")}
          className={`flex items-center gap-1.5 pb-1 transition-colors ${mode === "circuits" ? "text-white border-b border-white" : "hover:text-white"}`}
        >
          <CircuitBoard className="w-3 h-3 text-emerald-400" />
          ANALOG RIG
        </button>
      </div>

      {/* Mode A: Lifting Simulator */}
      {mode === "bench" && (
        <div className="flex flex-col gap-3 font-mono">
          <div className="flex justify-between items-center">
            <span className="text-[11px] text-muted-foreground">CRUCIBLE METRIC</span>
            <span className="text-white text-xs font-bold px-1.5 py-0.5 rounded bg-white/5">140kg / 308 lbs</span>
          </div>
          
          {/* Animated Barbell Rep Count */}
          <div className="bg-white/3 rounded-lg p-3 relative flex items-center justify-center h-16 border border-white/5">
            {/* Plates viz */}
            <div className="flex gap-1 items-center justify-center">
              {Array.from({ length: plateCount }).map((_, i) => (
                <div
                  key={i}
                  className={`bg-stone-500 border border-stone-400 w-2 h-10 rounded transition-all ${
                    liftStatus === "Lifting..." ? "animate-bounce" : ""
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
              <div className="bg-stone-300 w-20 h-2 rounded flex items-center justify-center font-bold text-[8px] text-black">
                {liftStatus === "Lifting..." ? "PRESSING" : "BARBELL"}
              </div>
              {Array.from({ length: plateCount }).map((_, i) => (
                <div
                  key={i}
                  className={`bg-stone-500 border border-stone-400 w-2 h-10 rounded transition-all ${
                    liftStatus === "Lifting..." ? "animate-bounce" : ""
                  }`}
                  style={{ animationDelay: `${(plateCount - 1 - i) * 0.1}s` }}
                />
              ))}
            </div>
            
            <div className="absolute top-2 right-2 text-[9px] text-[#f87171] uppercase animate-pulse flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" /> STREAK: 124D
            </div>
          </div>

          <div className="flex justify-between items-center mt-1">
            <div className="flex flex-col">
              <span className="text-[9px] text-muted-foreground">REPS GENERATED</span>
              <span className="text-white text-base font-bold">{benchRep}</span>
            </div>
            
            <button
              id="widget-lift-btn"
              onClick={handleLift}
              disabled={liftStatus === "Lifting..."}
              className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-stone-200 transition-all flex items-center gap-1 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Award className="w-3.5 h-3.5" />
              {liftStatus === "Lifting..." ? "LIFTING..." : "BENCH PRESS"}
            </button>
          </div>
        </div>
      )}

      {/* Mode B: Faith Portuguese Ministry Highlight */}
      {mode === "faith" && (
        <div className="flex flex-col gap-3 font-sans">
          <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground">
            <span>STREET PREACHING COORD</span>
            <span>LISBON, PORTUGAL</span>
          </div>

          <div className="bg-white/2 rounded-lg p-3 border border-white/5 flex flex-col gap-2 min-h-[64px] justify-center">
            <p className="text-xs italic text-white leading-relaxed">
              &ldquo;{portuguesesVerses[verseIdx].pt}&rdquo;
            </p>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              &lsquo;{portuguesesVerses[verseIdx].en}&rsquo;
            </p>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono text-[#60a5fa] flex items-center gap-1">
              <Languages className="w-3 h-3" /> CLICK TO CYCLE VERSE
            </span>
            <button
              id="widget-translation-btn"
              onClick={() => {
                setVerseIdx((i) => (i + 1) % portuguesesVerses.length);
                onTriggerPulse();
              }}
              className="p-1 px-3 rounded bg-white/5 text-[10px] text-white hover:bg-white/10 transition-all font-mono"
            >
              NEXT
            </button>
          </div>
        </div>
      )}

      {/* Mode C: Analog Filter Audio Synthesizer */}
      {mode === "circuits" && (
        <div className="flex flex-col gap-2 font-mono">
          <div className="flex justify-between items-center text-[10px] text-muted-foreground">
            <span>DSP HARMONICS</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> 110HZ ANALOG TONE
            </span>
          </div>

          <div className="bg-white/2 rounded-lg p-3 border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                id="widget-audio-toggle"
                onClick={toggleSynth}
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-stone-200 transition-all transform active:scale-95 cursor-pointer"
                title={isPlaying ? "Mute ambient circuit humming" : "Play ambient circuit humming"}
              >
                {isPlaying ? <Pause className="w-5 h-5 text-black fill-black" /> : <Play className="w-5 h-5 ml-0.5 text-black fill-black" />}
              </button>
              <div>
                <p className="text-xs text-white font-bold">{isPlaying ? "ORBIT HUM IS ACTIVE" : "SYNTH IS IDLE"}</p>
                <p className="text-[9px] text-muted-foreground font-mono">LOWPASS COUPLING: 220Hz</p>
              </div>
            </div>

            {/* Custom procedural volume bar graph simulation */}
            <div className="flex gap-0.5 h-6 items-end">
              {Array.from({ length: 9 }).map((_, i) => {
                const height = isPlaying ? Math.max(15, Math.sin(Date.now() * 0.01 + i) * 10 + 15) : 3;
                return (
                  <div
                    key={i}
                    className="w-[3px] bg-emerald-400 rounded-t"
                    style={{ height: `${height}px`, transition: "height 0.1s ease" }}
                  />
                );
              })}
            </div>
          </div>

          {/* Volume slider control */}
          <div className="flex gap-2 items-center mt-1">
            <Volume2 className="w-3.5 h-3.5 text-muted-foreground" />
            <input
              id="widget-volume-slider"
              type="range"
              min="0"
              max="0.4"
              step="0.01"
              value={synthVolume}
              onChange={handleVolumeChange}
              className="w-full accent-white bg-white/10 h-1 rounded"
              title="Filter intensity master volume"
            />
            <span className="text-[9px] text-muted-foreground w-8">{(synthVolume * 100).toFixed(0)}%</span>
          </div>
        </div>
      )}
    </div>
  );
}
