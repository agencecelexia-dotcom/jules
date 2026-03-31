"use client";

import { useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    quote:
      "Grace a HandiConnect, nous avons decouvert l'equitation adaptee pour notre fils. Une experience inoubliable !",
    author: "Sophie M.",
    city: "Paris",
  },
  {
    quote:
      "Enfin un espace ou je peux echanger avec des parents qui comprennent notre quotidien.",
    author: "Karim B.",
    city: "Marseille",
  },
  {
    quote:
      "La communaute nous a aide a trouver un restaurant accessible pour l'anniversaire de ma fille.",
    author: "Claire D.",
    city: "Lyon",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  return (
    <section className="py-24 px-4 bg-hc-cream">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-heading text-3xl font-bold text-hc-text mb-16">
          Ce que dit la communaute
        </h2>

        <div className="bg-white rounded-2xl p-8 shadow-sm min-h-[200px] flex flex-col items-center justify-center">
          <p className="text-lg italic text-hc-text leading-relaxed mb-6">
            &ldquo;{t.quote}&rdquo;
          </p>
          <p className="font-semibold text-hc-text">
            {t.author},{" "}
            <span className="font-normal text-hc-text-light">{t.city}</span>
          </p>
        </div>

        {/* Dot navigation */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Voir le temoignage ${index + 1}`}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === current
                  ? "bg-hc-blue"
                  : "bg-hc-blue/25 hover:bg-hc-blue/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
