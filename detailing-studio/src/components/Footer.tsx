export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 text-center sm:flex-row sm:text-left lg:px-8">
        <div>
          <p className="font-display text-lg tracking-[0.15em] text-white uppercase">
            Obsidian Detail Studio
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            Precision detailing for exceptional vehicles.
          </p>
        </div>
        <p className="text-sm text-zinc-600">
          © {new Date().getFullYear()} Obsidian Detail Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
