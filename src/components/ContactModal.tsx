import { useState, FormEvent } from "react";
import { X, Check, Instagram, Send, Mail } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Cliente Digital");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    // Simulate high-end analytics log submission
    setSubmitted(true);
    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-stone-950/20 backdrop-blur-md z-50 flex items-center justify-center p-4 selection:bg-stone-950 selection:text-white select-none">
      <div className="bg-white border border-stone-100 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl animate-fade-rise duration-300">
        
        {/* Header bar */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-stone-100 bg-stone-50">
          <div>
            <span className="font-display text-2xl text-stone-900 tracking-wide">Alinhar a Nossa Visão</span>
            <p className="text-[10px] font-mono text-stone-400 uppercase mt-1 tracking-widest">ENVIAR SINAL DE CONEXÃO</p>
          </div>
          <button
            id="contact-close-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-200/50 hover:bg-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-all cursor-pointer"
            title="Fechar interface"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form area */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-12 flex flex-col items-center justify-center gap-4 animate-pulse">
              <div className="w-12 h-12 rounded-full bg-emerald-100/80 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Check className="w-6 h-6" />
              </div>
              <p className="font-display text-xl text-stone-900">Transmissão Concluída</p>
              <p className="text-xs text-stone-500 font-mono max-w-xs uppercase tracking-widest leading-relaxed">
                Mensagem enviada com sucesso! O João responderá o mais brevemente possível.
              </p>
              <span className="text-[9px] text-[#059669] font-mono font-bold">ESTADO: TRANSMITIDO</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="contact-name" className="text-[9px] font-mono text-stone-400 uppercase tracking-widest">Identificação / Nome</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Dr. Afonso"
                    className="bg-stone-50 border border-stone-200 hover:border-stone-300 focus:border-stone-900 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none transition-all placeholder:text-stone-400 font-sans"
                  />
                </div>
                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="contact-email" className="text-[9px] font-mono text-stone-400 uppercase tracking-widest">Contacto / Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nome@email.com"
                    className="bg-stone-50 border border-stone-200 hover:border-stone-300 focus:border-stone-900 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none transition-all placeholder:text-stone-400 font-sans"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[9px] font-mono text-stone-400 uppercase tracking-widest">Natureza do Contacto</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    "Cliente Digital",
                    "Ministério / Fé",
                    "Engenharia"
                  ].map((cat) => (
                    <button
                      id={`inquiry-cat-btn-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`py-2 px-1 text-[11px] rounded-lg border font-mono transition-all text-center cursor-pointer ${
                        category === cat
                          ? "bg-stone-950 text-white border-stone-950 font-medium shadow-sm"
                          : "bg-stone-50 border-stone-200 text-stone-500 hover:bg-stone-100 hover:text-stone-900"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="contact-message" className="text-[9px] font-mono text-stone-400 uppercase tracking-widest">Mensagem</label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Conte-me sobre os seus objetivos e como podemos colaborar juntos..."
                  className="bg-stone-50 border border-stone-200 hover:border-stone-300 focus:border-stone-900 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none transition-all placeholder:text-stone-400 font-sans resize-none"
                />
              </div>

              <button
                id="contact-submit-btn"
                type="submit"
                className="w-full mt-2 bg-stone-950 hover:bg-stone-800 text-white text-xs py-3.5 rounded-full hover:scale-[1.01] active:scale-95 transition-all font-mono uppercase tracking-widest flex items-center justify-center gap-1.5 cursor-pointer border-none shadow-sm"
              >
                <Send className="w-3.5 h-3.5" /> Confirmar Ligação
              </button>

              <div className="flex items-center justify-between border-t border-stone-100 pt-4 mt-2">
                <span className="text-[9px] font-mono text-stone-400">PREFERE FALAR INSTANTANEAMENTE?</span>
                <a
                  id="contact-ig-link"
                  href="https://www.instagram.com/joao.brito_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-stone-700 hover:text-rose-600 hover:border-rose-300 transition-colors border border-stone-200 bg-stone-50 px-3 py-1.5 rounded-full font-mono scale-95"
                >
                  <Instagram className="w-3.5 h-3.5 text-rose-500" /> INSTAGRAM DIRECT
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
