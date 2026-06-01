import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getCalApi } from "@calcom/embed-react";
import Cal from "@calcom/embed-react";
import { Check, ChevronDown, Handshake, Instagram, MessageCircle, MessageSquare, Smartphone, Star, X } from "lucide-react";
import hero1 from "@/assets/hero-1.png";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import hero4 from "@/assets/hero-4.png";
import corteNew from "@/assets/corte-new.png";
import whatsappLogo from "@/assets/whatsapp.png";
import gallery1 from "@/assets/gallery-1.png";
import gallery2 from "@/assets/gallery-2.png";
import gallery3 from "@/assets/gallery-3.png";
import gallery4 from "@/assets/gallery-4.png";
import gallery5 from "@/assets/gallery-5.png";
import gallery6 from "@/assets/gallery-6.png";
import gallery7 from "@/assets/gallery-7.png";
import gallery8 from "@/assets/gallery-8.png";
import gallery9 from "@/assets/gallery-9.png";
import googleIcon from "@/assets/google-icon.png";

export const Route = createFileRoute("/")({
  component: Index,
});

const HERO_IMAGES = [hero1, hero2, hero3, hero4];

const GALLERY_IMAGES = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8, gallery9];

const WHATSAPP = "5511937654207";
const wa = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
const DEFAULT_MSG = "Olá, gostaria de marcar um horário.";

const SERVICES = [
  { name: "CORTE", price: "60", img: corteNew, desc: "Cortes clássicos e modernos", cal: "guilherme-melo/corte" },
  { name: "BARBA", price: "60", img: hero1, desc: "Contorno preciso e barba feita", cal: "guilherme-melo/barba" },
  { name: "COMBO ", price: "100", img: hero3, desc: "Corte, barba e barboterapia", cal: "guilherme-melo/combo" },
];

const TESTIMONIALS = [
  { initials: "BC", name: "BRUNO CALAZANS", date: "08/04/2025", rating: 5, text: "Cortes clássicos e profissionais excelentes em um ambiente super agradável!", color: "oklch(0.75 0.13 230)" },
  { initials: "JR", name: "JOSE RODRIGUEZ", date: "08/04/2025", rating: 4.5, text: "Eu buscava um certo padrão — algo que unisse técnica, profissionalismo e uma boa experiência.", color: "oklch(0.6 0.05 260)" },
  { initials: "MO", name: "MATEUS OLIVEIRA", date: "05/04/2025", rating: 5, text: "Atendimento impecável, o barbeiro entendeu exatamente o que eu queria. Voltarei sempre!", color: "oklch(0.78 0.08 300)" },
  { initials: "RC", name: "RAFAEL COSTA", date: "02/04/2025", rating: 4.5, text: "Ambiente incrível, música boa e o corte ficou perfeito. Virei cliente fiel.", color: "oklch(0.55 0.18 290)" },
  { initials: "LP", name: "LUCAS PEREIRA", date: "28/03/2025", rating: 5, text: "Melhor barbearia da Paulista. Profissionais atenciosos e resultado impecável.", color: "oklch(0.65 0.15 30)" },
  { initials: "AS", name: "ANDRÉ SILVA", date: "22/03/2025", rating: 4.5, text: "Ótima experiência, ambiente sofisticado e atendimento de primeira.", color: "oklch(0.55 0.12 150)" },
];

function AgendamentoModal({ calLink, onClose }: { calLink: string; onClose: () => void }) {
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const cal = await getCalApi();
        cal("on", {
          action: "bookingSuccessful",
          callback: () => setBooked(true),
        });
      } catch (e) {
        console.warn("Cal init failed", e);
      }
    })();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0" style={{ zIndex: 9999, background: "rgba(0,0,0,0.97)" }}>
      <button
        onClick={onClose}
        aria-label="Fechar"
        className="absolute right-4 top-4 z-10 text-white"
        style={{ padding: 16, background: "none", border: "none" }}
      >
        <X size={32} />
      </button>
      {booked ? (
        <div className="flex h-full w-full items-center justify-center" style={{ background: "#000", padding: 32 }}>
          <div className="w-full max-w-sm text-center">
            <div
              className="mx-auto flex items-center justify-center rounded-full"
              style={{ width: 64, height: 64, background: "rgba(255,255,255,0.08)" }}
            >
              <Check size={32} style={{ color: "#4CAF50" }} />
            </div>
            <h3
              className="font-serif font-bold"
              style={{ color: "#fff", fontSize: 26, marginTop: 20 }}
            >
              Horário Reservado!
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: 14,
                lineHeight: 1.7,
                marginTop: 12,
                fontFamily: "Inter, sans-serif",
              }}
            >
              Perfeito! Você receberá a confirmação pelo e-mail cadastrado. Para dúvidas ou cancelamentos, fale diretamente com a gente pelo WhatsApp.
            </p>
            <div style={{ height: 1, background: "rgba(201,168,76,0.35)", margin: "24px 0" }} />
            <button
              onClick={onClose}
              style={{
                background: "#C9A84C",
                color: "#000",
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
                width: "100%",
                height: 48,
                borderRadius: 0,
                border: "none",
                cursor: "pointer",
              }}
            >
              Fechar
            </button>
          </div>
        </div>
      ) : (
        <div className="h-full w-full overflow-auto pt-16">
          <Cal
            calLink={calLink}
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
            config={{ layout: "month_view", theme: "dark" }}
          />
        </div>
      )}
    </div>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <div key={i} className="relative h-4 w-4">
            <Star className="absolute inset-0 h-4 w-4 fill-current text-amber-500/25" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className="h-4 w-4 fill-current text-amber-500" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Hero() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden bg-black">
      {HERO_IMAGES.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-[1800ms] ease-in-out"
          style={{ opacity: i === idx ? 1 : 0 }}
        >
          <img src={src} alt="" className="h-full w-full object-cover grayscale" style={{ animation: i === idx ? "kenburns 7s ease-out forwards" : undefined }} />
          <div className="absolute inset-0 bg-black/55" />
        </div>
      ))}

      <nav className="relative z-10 flex items-center justify-end gap-6 px-6 pt-8 text-xs tracking-[0.25em] text-white sm:px-12 md:justify-center md:gap-12 md:text-sm">
        <a href="#servicos" className="whitespace-nowrap text-[10px] hover:text-gold sm:text-xs md:text-sm">SERVIÇOS</a>
        <a href="#galeria" className="whitespace-nowrap text-[10px] hover:text-gold sm:text-xs md:text-sm">NOSSOS CLIENTES</a>
        <a href={wa(DEFAULT_MSG)} target="_blank" rel="noreferrer" className="whitespace-nowrap text-[10px] hover:text-gold sm:text-xs md:text-sm">CONTATO</a>
      </nav>

      <div className="relative z-10 flex h-[calc(100%-72px)] flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm tracking-[0.35em] text-gold sm:text-base">N°1 — SÃO PAULO</p>
        <h1 className="font-serif text-6xl font-medium leading-none text-white sm:text-7xl md:text-8xl lg:text-9xl">
          Dom Barbearia
        </h1>
        <div className="my-6 h-px w-40 bg-gold sm:w-56" />
        <p className="text-sm tracking-[0.3em] text-white sm:text-base md:text-lg">
          CABELO, BARBA E BIGODE
        </p>

        <a
          href="#servicos"
          className="absolute bottom-0 left-1/2 flex h-16 w-36 -translate-x-1/2 flex-col items-center justify-center rounded-t-2xl bg-gold text-gold-foreground transition-transform hover:-translate-y-1 hover:-translate-x-1/2"
        >
          <span className="text-sm tracking-[0.25em]">AGENDAR</span>
          <ChevronDown className="mt-1 h-4 w-4" strokeWidth={2.5} />
        </a>
        <p
          className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center uppercase"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 11,
            letterSpacing: 1,
            color: "rgba(255,255,255,0.45)",
            marginTop: 12,
            whiteSpace: "nowrap",
          }}
        >
          Pelo site, WhatsApp ou pessoalmente — você decide
        </p>
      </div>

      <style>{`@keyframes kenburns { from { transform: scale(1); } to { transform: scale(1.08); } }`}</style>
    </section>
  );
}

function Services() {
  const [openCal, setOpenCal] = useState<string | null>(null);
  return (
    <section id="servicos" className="bg-[oklch(0.13_0.01_60)] py-24">
      <h2 className="mb-16 px-6 text-center font-serif text-4xl tracking-wide text-gold sm:text-5xl">
        NOSSOS SERVIÇOS
      </h2>
      <div
        className="services-scroll mx-auto flex max-w-6xl flex-row gap-3 overflow-x-auto md:grid md:grid-cols-3 md:gap-6 md:px-12"
        style={{
          scrollSnapType: "x mandatory",
          padding: "0 16px",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {SERVICES.map((s) => (
          <article
            key={s.name}
            className="group relative overflow-hidden border border-gold/30 bg-black md:min-w-0"
            style={{
              minWidth: "75vw",
              scrollSnapAlign: "start",
              borderRadius: 16,
              height: 420,
            }}
          >
            <div className="relative h-full overflow-hidden">
              <img src={s.img} alt={s.name} className="h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-20 left-6 right-6 flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-serif text-2xl font-semibold tracking-wide text-white sm:text-3xl">{s.name}</h3>
                  <p className="mt-2 text-sm text-white/70">{s.desc}</p>
                </div>
                <div className="flex shrink-0 items-baseline gap-1 font-serif text-3xl font-light leading-none text-white">
                  <span>R$</span>
                  <span>{s.price}</span>
                </div>
              </div>
              <button
                onClick={() => setOpenCal(s.cal)}
                className="absolute bottom-5 left-6 right-6 flex items-center justify-center gap-2 rounded-md bg-gold py-3 text-xs tracking-[0.25em] text-black transition hover:bg-gold/90"
              >
                <MessageCircle className="h-4 w-4" /> AGENDAR
              </button>
            </div>
          </article>
        ))}
      </div>
      <style>{`.services-scroll{scrollbar-width:none}.services-scroll::-webkit-scrollbar{display:none}`}</style>
      {openCal && <AgendamentoModal calLink={openCal} onClose={() => setOpenCal(null)} />}
    </section>
  );
}

function Gallery() {
  return (
    <section id="galeria" className="overflow-hidden bg-black py-20">
      <div className="px-6 sm:px-12">
        <h2 className="mb-12 text-center font-serif text-4xl tracking-wide text-gold sm:text-5xl">
          RESULTADOS REAIS
        </h2>
      </div>
      <div className="group relative w-full overflow-hidden">
        <div className="flex w-max animate-gallery-scroll gap-4 group-hover:[animation-play-state:paused]">
          {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((src, i) => (
            <div key={i} className="h-72 w-56 shrink-0 overflow-hidden rounded-xl border border-gold/20 sm:h-96 sm:w-72">
              <img src={src} alt="" className="h-full w-full object-cover grayscale transition duration-500 hover:grayscale-0" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 flex justify-center px-6">
        <a
          href="https://instagram.com/dombarbearia"
          target="_blank"
          rel="noreferrer"
          className="inline-block border text-white uppercase"
          style={{
            borderColor: "#fff",
            borderWidth: 1,
            fontFamily: "Inter, sans-serif",
            fontSize: 11,
            letterSpacing: 2,
            padding: "12px 24px",
            background: "transparent",
          }}
        >
          VER MAIS NO INSTAGRAM →
        </a>
      </div>
      <style>{`@keyframes gallery-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } } .animate-gallery-scroll { animation: gallery-scroll 40s linear infinite; }`}</style>
    </section>
  );
}

function Agendamento360() {
  const cards = [
    { Icon: Smartphone, title: "Via Site", text: "Seu cliente escolhe o serviço e cai no seu WhatsApp com o pedido já organizado" },
    { Icon: MessageSquare, title: "Via WhatsApp", text: "Atende como sempre, sem mudar nada no dia a dia" },
    { Icon: Handshake, title: "Pessoalmente", text: "Walk-in sempre bem-vindo, sem complicação" },
  ];
  return (
    <section style={{ background: "#0a0a0a", padding: "52px 20px" }}>
      <p style={{ color: "#C9A84C", fontFamily: "Inter, sans-serif", fontSize: 11, letterSpacing: 4, textTransform: "uppercase", textAlign: "center" }}>
        AGENDAMENTO DO SEU JEITO
      </p>
      <h2 className="font-serif font-bold" style={{ color: "#fff", fontSize: 28, textAlign: "center", marginTop: 8 }}>
        Você controla.
      </h2>
      <p style={{ color: "rgba(255,255,255,0.55)", fontFamily: "Inter, sans-serif", fontSize: 14, textAlign: "center", marginTop: 6 }}>
        Seus clientes escolhem o canal. Nada muda no seu dia a dia.
      </p>
      <div className="mx-auto flex max-w-3xl flex-col gap-2.5 md:flex-row md:gap-4" style={{ marginTop: 28 }}>
        {cards.map(({ Icon, title, text }) => (
          <div
            key={title}
            className="flex-1"
            style={{ background: "#141414", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 12, padding: 20 }}
          >
            <Icon size={26} style={{ color: "#C9A84C" }} />
            <h3 style={{ color: "#fff", fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 14, marginTop: 10 }}>{title}</h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Inter, sans-serif", fontSize: 12, lineHeight: 1.6, marginTop: 6 }}>
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="clientes" className="overflow-hidden bg-black py-24">
      <h2 className="mx-auto max-w-6xl whitespace-nowrap px-6 text-center font-sans text-lg font-extrabold leading-tight text-gold sm:text-2xl md:text-3xl">
        O QUE NOSSOS CLIENTES DIZEM...
      </h2>
      <div className="reviews-marquee group relative mt-12 w-full overflow-hidden">
        <div className="reviews-track flex w-max gap-4">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div key={i} className="w-[85vw] shrink-0 sm:w-[360px]">
              <div className="rounded-2xl bg-white p-5 shadow-xl sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white sm:h-12 sm:w-12 sm:text-sm" style={{ backgroundColor: t.color }}>
                    {t.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-black sm:text-sm">{t.name}</p>
                    <p className="text-[11px] text-gray-500 sm:text-xs">{t.date}</p>
                  </div>
                  <img src={googleIcon} alt="Google" className="h-6 w-6 rounded-full object-cover" />
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Stars rating={t.rating} />
                  <span className="text-xs font-semibold text-gray-700">{t.rating.toFixed(1)}</span>
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-gray-800 sm:text-sm">{t.text}</p>
              </div>
            </div>
          ))}
        </div>
        <style>{`
          @keyframes reviews-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          .reviews-track { animation: reviews-marquee 38s linear infinite; }
          .reviews-marquee:hover .reviews-track, .reviews-marquee:active .reviews-track { animation-play-state: paused; }
        `}</style>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contato" className="bg-black px-6 py-24 text-center sm:px-12">
      <p className="text-sm tracking-[0.35em] text-gold">NOS ENCONTRE</p>
      <h2 className="mt-6 whitespace-nowrap font-sans text-lg font-bold text-white sm:text-3xl md:text-5xl">
        Av. Paulista, 1941 — Bela Vista
      </h2>
      <div className="mx-auto mt-10 aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-lg border border-gold/40 shadow-2xl">
        <iframe
          title="Mapa Dom Barbearia"
          src="https://www.google.com/maps?q=Av.+Paulista+1941+Bela+Vista+S%C3%A3o+Paulo&output=embed"
          className="h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <a
        href="https://maps.google.com/?q=Av.+Paulista+1941+Sao+Paulo"
        target="_blank"
        rel="noreferrer"
        className="mx-auto mt-8 flex w-full max-w-2xl items-center justify-center gap-3 border-2 border-gold bg-gold/90 px-8 py-5 text-sm tracking-[0.25em] text-black transition hover:bg-gold sm:text-base"
      >
        ABRIR NO GOOGLE MAPS ›
      </a>
      <div className="mt-10 flex justify-center gap-6 text-gold">
        <a
          href="https://instagram.com/dombarbearia"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-white"
          style={{ border: "1px solid rgba(255,255,255,0.2)", padding: "10px 16px", borderRadius: 8, background: "transparent" }}
        >
          <Instagram className="h-5 w-5" />
          <span className="text-sm">@dombarbearia</span>
        </a>
        <a
          href="https://wa.me/5511937654207"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-white"
          style={{ border: "1px solid rgba(255,255,255,0.2)", padding: "10px 16px", borderRadius: 8, background: "transparent" }}
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-sm">Fale conosco</span>
        </a>
      </div>
    </section>
  );
}

function DeveloperCTA() {
  return (
    <section style={{ background: "#050505", borderTop: "1px solid rgba(201,168,76,0.25)", padding: "44px 24px" }}>
      <p style={{ color: "#C9A84C", fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", textAlign: "center" }}>
        DESENVOLVIDO POR
      </p>
      <p className="font-serif" style={{ color: "#fff", fontSize: 20, textAlign: "center", marginTop: 4 }}>
        Guilherme Melo
      </p>
      <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Inter, sans-serif", fontSize: 13, textAlign: "center", marginTop: 16 }}>
        Quer um site assim para sua barbearia?
      </p>
      <p className="font-serif font-bold" style={{ color: "#fff", fontSize: 42, textAlign: "center", marginTop: 4 }}>
        R$300
      </p>
      <p style={{ color: "#C9A84C", fontFamily: "Inter, sans-serif", fontSize: 11, letterSpacing: 1, textAlign: "center", marginTop: 4 }}>
        Pagamento único · Sem mensalidade · Pronto em 24h
      </p>
      <a
        href="https://wa.me/5511937654207?text=Olá%20Guilherme!%20Vi%20o%20site%20da%20Dom%20Barbearia%20e%20quero%20um%20site%20assim%20para%20minha%20barbearia.%20Podemos%20conversar%3F"
        target="_blank"
        rel="noreferrer"
        style={{
          background: "#C9A84C",
          color: "#000",
          fontFamily: "Inter, sans-serif",
          fontSize: 12,
          letterSpacing: 2,
          textTransform: "uppercase",
          padding: "16px 32px",
          borderRadius: 0,
          display: "block",
          margin: "20px auto 0",
          width: "fit-content",
          textAlign: "center",
        }}
      >
        QUERO O MEU SITE →
      </a>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gold/30 bg-[oklch(0.11_0.01_60)] px-6 py-12 text-center">
      <p className="font-serif text-2xl text-gold">DOM Barbearia</p>
      <p className="mt-3 text-xs text-white/70">© 2026 DOM Barbearia. Todos os direitos reservados.</p>
      <p className="mt-1 text-xs text-white/70">Seg — Sáb: 9h às 20h | Dom: 9h às 14h</p>
    </footer>
  );
}

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Hero />
      <Services />
      <Gallery />
      <Agendamento360 />
      <Testimonials />
      <Contact />
      <DeveloperCTA />
      <Footer />
      <a
        href={wa(DEFAULT_MSG)}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-5 right-5 z-50 overflow-hidden rounded-2xl shadow-2xl transition hover:scale-110"
      >
        <img src={whatsappLogo} alt="WhatsApp" className="block h-11 w-11 sm:h-14 sm:w-14" />
      </a>
    </main>
  );
}
