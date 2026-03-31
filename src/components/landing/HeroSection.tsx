"use client";

import Link from "next/link";

/* ---------- Mini feed card (decorative) ---------- */
function MiniPostCard({
  name,
  initials,
  text,
  image,
  likes,
}: {
  name: string;
  initials: string;
  text: string;
  image: string;
  likes: string;
}) {
  return (
    <div className="bg-white rounded-xl p-3 mb-3 last:mb-0" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-full gradient-warm flex items-center justify-center text-[10px] font-bold text-white shrink-0">
          {initials}
        </div>
        <span className="text-xs font-semibold text-hc-text truncate">{name}</span>
      </div>
      {/* Image placeholder */}
      <div className="w-full h-24 rounded-lg bg-hc-bg-secondary mb-2 flex items-center justify-center text-2xl select-none">
        {image}
      </div>
      {/* Text */}
      <p className="text-[11px] text-hc-text-secondary leading-snug line-clamp-2">{text}</p>
      {/* Engagement */}
      <div className="flex items-center gap-3 mt-2 text-[10px] text-hc-text-muted">
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3 text-hc-red" fill="currentColor" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" /></svg>
          {likes}
        </span>
        <span>3 commentaires</span>
      </div>
    </div>
  );
}

/* ---------- Overlapping avatars ---------- */
function AvatarStack() {
  const avatars = [
    { initials: "SM", bg: "from-pink-400 to-rose-500" },
    { initials: "KB", bg: "from-blue-400 to-indigo-500" },
    { initials: "CD", bg: "from-amber-400 to-orange-500" },
    { initials: "LT", bg: "from-emerald-400 to-teal-500" },
  ];
  return (
    <div className="flex items-center">
      {avatars.map((a, i) => (
        <div
          key={a.initials}
          className={`w-8 h-8 rounded-full bg-gradient-to-br ${a.bg} flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-white`}
          style={{ marginLeft: i === 0 ? 0 : "-8px", zIndex: avatars.length - i }}
        >
          {a.initials}
        </div>
      ))}
    </div>
  );
}

/* ========== HERO ========== */
export function HeroSection() {
  return (
    <section className="min-h-[85vh] bg-white flex items-center relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

        {/* ── LEFT (55%) ── */}
        <div className="flex-[55] max-w-xl lg:max-w-none">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-hc-text leading-[1.1] animate-fade-in-up stagger-1">
            Partagez, decouvrez, connectez
          </h1>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mt-2 animate-fade-in-up stagger-2">
            <span className="text-gradient-warm">en toute inclusivite.</span>
          </h1>

          <p className="text-hc-text-secondary text-lg max-w-md leading-relaxed mt-8 animate-fade-in-up stagger-2">
            Le reseau des familles en situation de handicap. Activites testees, avis de confiance, communaute bienveillante.
          </p>

          {/* CTA */}
          <div className="mt-10 animate-fade-in-up stagger-3">
            <Link
              href="/connexion"
              className="inline-flex items-center justify-center rounded-full gradient-warm text-white px-8 py-4 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Commencer gratuitement
            </Link>
          </div>

          {/* Trust line */}
          <div className="flex items-center gap-3 mt-8 animate-fade-in-up stagger-4">
            <AvatarStack />
            <span className="text-sm text-hc-text-muted">
              Rejoignez <strong className="text-hc-text font-semibold">2 500+</strong> familles
            </span>
          </div>
        </div>

        {/* ── RIGHT (45%, desktop only) ── */}
        <div className="hidden lg:flex flex-[45] relative items-center justify-center min-h-[560px]">
          {/* Decorative floating circles */}
          <div className="absolute -top-10 -right-8 w-48 h-48 rounded-full bg-hc-coral/20 blur-2xl" aria-hidden="true" />
          <div className="absolute bottom-10 -left-12 w-56 h-56 rounded-full bg-hc-blue/10 blur-2xl" aria-hidden="true" />
          <div className="absolute top-1/2 right-0 w-32 h-32 rounded-full bg-hc-orange/15 blur-xl" aria-hidden="true" />

          {/* Phone mockup */}
          <div className="relative w-[320px] h-[560px] rounded-3xl bg-hc-bg-secondary rotate-2 shadow-2xl overflow-hidden animate-slide-up stagger-4">
            {/* Phone notch */}
            <div className="w-28 h-5 bg-white rounded-b-2xl mx-auto" />

            {/* Feed content inside */}
            <div className="p-4 pt-3">
              {/* Mini top bar inside phone */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-hc-text">
                  <span className="text-hc-text">Handi</span>
                  <span className="text-gradient-warm">Connect</span>
                </span>
                <div className="w-5 h-5 rounded-full bg-hc-coral/20" />
              </div>

              {/* Mini posts */}
              <MiniPostCard
                name="Sophie M."
                initials="SM"
                text="Super seance d'equitation adaptee avec Lucas aujourd'hui !"
                image="🐴"
                likes="24"
              />
              <MiniPostCard
                name="Karim B."
                initials="KB"
                text="Nouveau restaurant accessible decouvert a Marseille. Accueil top !"
                image="🍽️"
                likes="18"
              />
              <MiniPostCard
                name="Claire D."
                initials="CD"
                text="Atelier sensoriel a la mediatheque — les enfants ont adore."
                image="🎨"
                likes="31"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
