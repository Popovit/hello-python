import Image from "next/image";

export default function Hero() {
  return (
    <section className="luxury-gradient relative min-h-screen overflow-hidden pt-28">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1619405399517-d7fce0f13302?auto=format&fit=crop&w=2400&q=80"
          alt="Luxury sports car with mirror finish"
          fill
          priority
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-6 pb-24 lg:min-h-[calc(100vh-7rem)] lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm tracking-[0.35em] text-gold uppercase">
            Premium Auto Detailing
          </p>
          <h1 className="font-display text-5xl leading-tight text-white sm:text-6xl lg:text-7xl">
            Where precision
            <span className="block text-gold-light italic">meets perfection.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            Obsidian Detail Studio delivers concierge-level care for exotic,
            classic, and daily drivers — from paint correction to ceramic
            protection, finished to a mirror standard.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-4 text-sm font-semibold tracking-wide text-black transition hover:bg-gold-light"
            >
              Schedule Consultation
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-8 py-4 text-sm font-semibold tracking-wide text-white transition hover:border-gold/50 hover:text-gold"
            >
              View Services
            </a>
          </div>
        </div>

        <div className="grid max-w-md grid-cols-2 gap-4 lg:mb-4">
          {[
            { value: "12+", label: "Years of craft" },
            { value: "2.4k", label: "Vehicles restored" },
            { value: "5.0", label: "Average rating" },
            { value: "48hr", label: "Turnaround options" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
            >
              <p className="font-display text-3xl text-gold">{stat.value}</p>
              <p className="mt-1 text-sm text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="gold-line relative mx-auto h-px max-w-7xl opacity-60" />
    </section>
  );
}
