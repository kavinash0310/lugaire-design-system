import Link from "next/link"
import Image from "next/image"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="grid min-h-dvh lg:grid-cols-2">
      {/* Editorial panel */}
      <aside className="grain relative hidden overflow-hidden bg-[#141210] lg:block">
        <Image
          src="/editorial/hero-portrait.png"
          alt="LUGAIRE editorial portrait"
          fill
          priority
          sizes="50vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/30 to-transparent" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Link
            href="/"
            className="font-display text-xl font-semibold uppercase tracking-[0.24em] text-[#f5f2eb]"
          >
            Lugaire
          </Link>
          <div className="max-w-md">
            <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-[#c98a52]">
              A House of Menswear
            </p>
            <p className="font-serif text-3xl leading-[1.05] text-[#f5f2eb] text-balance">
              Considered luxury, built to endure — and kept close to those who wear it.
            </p>
          </div>
        </div>
      </aside>

      {/* Form panel */}
      <section className="flex items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-sm">
          <Link
            href="/"
            className="mb-10 inline-block font-display text-lg font-semibold uppercase tracking-[0.24em] lg:hidden"
          >
            Lugaire
          </Link>
          {children}
        </div>
      </section>
    </main>
  )
}
