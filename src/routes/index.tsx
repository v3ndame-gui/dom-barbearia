import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Instagram, MessageCircle, Star } from "lucide-react";
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

export const Route = createFileRoute("/")({
  component: Index,
});

const HERO_IMAGES = [hero1, hero2, hero3, hero4];

const GALLERY_IMAGES = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8, gallery9];

const WHATSAPP = "5511937654207";
const wa = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
const DEFAULT_MSG = "Olá, gostaria de marcar um horário.";

const SERVICES = [
  { name: "CORTE", price: "60", img: corteNew, desc: "Cortes clássicos e modernos" },
  { name: "BARBA", price: "60", img: hero1, desc: "Contorno preciso e barba feita" },
  { name: "COMBO + BARBOTERAPIA", price: "100", img: hero3, desc: "Corte, barba e relaxamento" },
];

const TESTIMONIALS = [
  { initials: "BC", name: "BRUNO CALAZANS", date: "08/04/2025", rating: 5, text: "Cortes clássicos e profissionais excelentes em um ambiente super agradável!", color: "oklch(0.75 0.13 230)" },
  { initials: "JR", name: "JOSE RODRIGUEZ", date: "08/04/2025", rating: 4.5, text: "Eu buscava um certo padrão — algo que unisse técnica, profissionalismo e uma boa experiência.", color: "oklch(0.6 0.05 260)" },
  { initials: "MO", name: "MATEUS OLIVEIRA", date: "05/04/2025", rating: 5, text: "Atendimento impecável, o barbeiro entendeu exatamente o que eu queria. Voltarei sempre!", color: "oklch(0.78 0.08 300)" },
  { initials: "RC", name: "RAFAEL COSTA", date: "02/04/2025", rating: 4.5, text: "Ambiente incrível, música boa e o corte ficou perfeito. Virei cliente fiel.", color: "oklch(0.55 0.18 290)" },
  { initials: "LP", name: "LUCAS PEREIRA", date: "28/03/2025", rating: 5, text: "Melhor barbearia da Paulista. Profissionais atenciosos e resultado impecável.", color: "oklch(0.65 0.15 30)" },
  { initials: "AS", name: "ANDRÉ SILVA", date: "22/03/2025", rating: 4.5, text: "Ótima experiência, ambiente sofisticado e atendimento de primeira.", color: "oklch(0.55 0.12 150)" },
];

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

      <nav className="relative z-10 flex items-center justify-end gap-6 px-6 pt-8 text-xs tracking-[0.25em] text-white sm:px-12 md:gap-12 md:text-sm">
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
      </div>

      <style>{`@keyframes kenburns { from { transform: scale(1); } to { transform: scale(1.08); } }`}</style>
    </section>
  );
}

function Services() {
  return (
    <section id="servicos" className="bg-[oklch(0.13_0.01_60)] px-6 py-24 sm:px-12">
      <h2 className="mb-16 text-center font-serif text-4xl tracking-wide text-gold sm:text-5xl">
        NOSSOS SERVIÇOS
      </h2>
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        {SERVICES.map((s) => (
          <article key={s.name} className="group relative overflow-hidden rounded-lg border border-gold/30 bg-black">
            <div className="relative h-96 overflow-hidden">
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
              <a
                href={wa(`Olá, gostaria de agendar marcar ${s.name.toLowerCase()}.`)}
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-5 left-6 right-6 flex items-center justify-center gap-2 rounded-md bg-gold py-3 text-xs tracking-[0.25em] text-black transition hover:bg-gold/90"
              >
                <MessageCircle className="h-4 w-4" /> AGENDAR
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
}

function Gallery() {
  return (
    <section id="galeria" className="overflow-hidden bg-black py-20">
      <div className="px-6 sm:px-12">
        <h2 className="mb-12 text-center font-serif text-4xl tracking-wide text-gold sm:text-5xl">
          NOSSOS CLIENTES
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
      <style>{`@keyframes gallery-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } } .animate-gallery-scroll { animation: gallery-scroll 40s linear infinite; }`}</style>
    </section>
  );
}

function TestimonialsBroken() {
  const [perPage, setPerPage] = useState(1);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const update = () => setPerPage(window.innerWidth < 768 ? 1 : 3);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const pages = Math.max(1, TESTIMONIALS.length - perPage + 1);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setPage((p) => (p + 1) % pages), 4000);
    return () => clearInterval(t);
  }, [paused, pages]);

  return (
    <section id="clientes" className="bg-mustard px-6 py-24 sm:px-12">
      <h2 className="mx-auto max-w-6xl font-sans text-4xl font-extrabold leading-tight text-black sm:text-5xl">
        O QUE NOSSOS<br />CLIENTES DIZEM...
      </h2>

      <div className="relative mx-auto mt-12 max-w-6xl" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onTouchStart={() => setPaused(true)}>
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${page * (100 / perPage)}%)` }}
          >
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="w-full shrink-0 px-3 md:w-1/3">
                <div className="rounded-2xl bg-white p-5 shadow-xl sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white sm:h-12 sm:w-12 sm:text-sm" style={{ backgroundColor: t.color }}>
                      {t.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold text-black sm:text-sm">{t.name}</p>
                      <p className="text-[11px] text-gray-500 sm:text-xs">{t.date}</p>
                    </div>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold" style={{ background: "conic-gradient(#4285f4, #ea4335, #fbbc05, #34a853)", color: "white" }}>G</div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <Stars rating={t.rating} />
                    <span className="text-xs font-semibold text-gray-700">{t.rating.toFixed(1)}</span>
                  </div>
                  <p className="mt-3 text-[13px] leading-relaxed text-gray-800 sm:text-sm">{t.text}</p>
                  <button className="mt-3 text-sm text-mustard hover:underline" style={{ color: "oklch(0.55 0.14 75)" }}>Leia mais</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => setPage((p) => Math.max(0, p - 1))} className="absolute -left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg md:-left-5">
          <ChevronLeft className="h-5 w-5 text-black" />
        </button>
        <button onClick={() => setPage((p) => Math.min(pages - 1, p + 1))} className="absolute -right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg md:-right-5">
          <ChevronRight className="h-5 w-5 text-black" />
        </button>

        <div className="mt-8 flex justify-center gap-2">
          {[...Array(pages)].map((_, i) => (
            <button key={i} onClick={() => setPage(i)} className="h-2 w-2 rounded-full transition-all" style={{ backgroundColor: i === page ? "black" : "rgba(0,0,0,0.3)" }} />
          ))}
        </div>
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
        <a href="#" aria-label="Instagram" className="flex h-12 w-12 items-center justify-center rounded-full border border-gold hover:bg-gold hover:text-black"><Instagram className="h-5 w-5" /></a>
        <a href={wa(DEFAULT_MSG)} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="flex h-12 w-12 items-center justify-center rounded-full border border-gold hover:bg-gold hover:text-black"><MessageCircle className="h-5 w-5" /></a>
      </div>
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
      <Testimonials />
      <Contact />
      <Footer />
      <a
        href={wa(DEFAULT_MSG)}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-5 right-5 z-50 overflow-hidden rounded-2xl shadow-2xl transition hover:scale-110"
      >
        <img src={whatsappLogo} alt="WhatsApp" className="block h-14 w-14" />
      </a>
    </main>
  );
}
