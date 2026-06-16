const services = [
  {
    name: "Signature Wash",
    price: "$149",
    duration: "2 hrs",
    description: "Hand wash, decontamination, wheel detail, and interior vacuum.",
    features: ["pH-neutral foam", "Microfiber dry", "Glass clarity"],
  },
  {
    name: "Paint Correction",
    price: "$899",
    duration: "1–2 days",
    description: "Multi-stage polish to remove swirls, haze, and light defects.",
    features: ["Paint depth scan", "Dual-stage polish", "Refined finish"],
    featured: true,
  },
  {
    name: "Ceramic Coating",
    price: "$1,499",
    duration: "2–3 days",
    description: "9H ceramic protection with hydrophobic gloss for years of defense.",
    features: ["Surface prep", "3-layer application", "5-year warranty"],
  },
  {
    name: "Interior Revival",
    price: "$449",
    duration: "4–6 hrs",
    description: "Deep clean leather, alcantara, and trim with UV-safe conditioning.",
    features: ["Steam extraction", "Leather feed", "Odor neutralization"],
  },
  {
    name: "Engine Bay Detail",
    price: "$249",
    duration: "3 hrs",
    description: "Meticulous degrease and dress for a showroom engine compartment.",
    features: ["Safe degreasing", "Hose-off rinse", "Matte dressing"],
  },
  {
    name: "Concierge Package",
    price: "$2,999",
    duration: "3–5 days",
    description: "Full correction, coating, interior, and pickup/delivery included.",
    features: ["White-glove pickup", "Full correction", "Lifetime maintenance plan"],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm tracking-[0.35em] text-gold uppercase">Services</p>
          <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl">
            Tailored packages, transparent pricing
          </h2>
          <p className="mt-4 text-zinc-400">
            Every service is performed by certified technicians using boutique
            products selected for your vehicle&apos;s finish.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.name}
              className={`group relative flex flex-col rounded-2xl border p-8 transition duration-300 hover:-translate-y-1 hover:border-gold/30 ${
                service.featured
                  ? "border-gold/40 bg-gradient-to-b from-gold/10 to-surface-elevated shadow-[0_0_40px_rgba(201,169,98,0.08)]"
                  : "border-white/10 bg-surface-elevated hover:bg-surface"
              }`}
            >
              {service.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-gold px-3 py-1 text-xs font-semibold tracking-wide text-black uppercase">
                  Most Popular
                </span>
              )}

              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl text-white">{service.name}</h3>
                <p className="text-right">
                  <span className="block font-display text-3xl text-gold">
                    {service.price}
                  </span>
                  <span className="text-xs tracking-wide text-zinc-500 uppercase">
                    {service.duration}
                  </span>
                </p>
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-400">
                {service.description}
              </p>

              <ul className="mt-6 space-y-2 border-t border-white/10 pt-6">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-zinc-300"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
