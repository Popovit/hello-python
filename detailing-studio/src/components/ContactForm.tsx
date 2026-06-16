"use client";

import { FormEvent, useState } from "react";

const serviceOptions = [
  "Signature Wash",
  "Paint Correction",
  "Ceramic Coating",
  "Interior Revival",
  "Engine Bay Detail",
  "Concierge Package",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm tracking-[0.35em] text-gold uppercase">Contact</p>
            <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl">
              Request your private consultation
            </h2>
            <p className="mt-4 text-zinc-400">
              Share your vehicle details and preferred service. Our studio
              concierge will respond within one business day.
            </p>

            <dl className="mt-10 space-y-6">
              <div>
                <dt className="text-xs tracking-[0.25em] text-zinc-500 uppercase">
                  Studio
                </dt>
                <dd className="mt-1 text-zinc-200">
                  1840 Silverline Drive, Suite 12
                  <br />
                  Beverly Hills, CA 90210
                </dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.25em] text-zinc-500 uppercase">
                  Hours
                </dt>
                <dd className="mt-1 text-zinc-200">
                  Tue – Sat: 8:00 AM – 6:00 PM
                  <br />
                  Sun – Mon: By appointment
                </dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.25em] text-zinc-500 uppercase">
                  Direct
                </dt>
                <dd className="mt-1 text-zinc-200">
                  (310) 555-0147
                  <br />
                  concierge@obsidiandetail.com
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-white/10 bg-surface-elevated p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)] lg:p-10">
            {submitted ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
                  <span className="text-2xl text-gold">✓</span>
                </div>
                <h3 className="font-display text-2xl text-white">Request received</h3>
                <p className="mt-3 max-w-sm text-zinc-400">
                  Thank you. A member of our concierge team will reach out shortly
                  to confirm your consultation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm text-zinc-400">Full name</span>
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder="Jordan Ellis"
                      className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-white outline-none transition focus:border-gold/50"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm text-zinc-400">Phone</span>
                    <input
                      required
                      name="phone"
                      type="tel"
                      placeholder="(310) 555-0199"
                      className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-white outline-none transition focus:border-gold/50"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-sm text-zinc-400">Email</span>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                    className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-white outline-none transition focus:border-gold/50"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm text-zinc-400">Service</span>
                  <select
                    required
                    name="service"
                    defaultValue=""
                    className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-white outline-none transition focus:border-gold/50"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {serviceOptions.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm text-zinc-400">
                    Vehicle & notes
                  </span>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    placeholder="2024 Porsche 911 · interested in ceramic coating..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-background px-4 py-3 text-white outline-none transition focus:border-gold/50"
                  />
                </label>

                <button
                  type="submit"
                  className="w-full rounded-full bg-gold py-4 text-sm font-semibold tracking-wide text-black transition hover:bg-gold-light"
                >
                  Submit Request
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
