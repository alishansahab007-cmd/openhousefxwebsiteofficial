import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

interface PolicyPageProps {
  title: string;
  sections: readonly (readonly [string, string])[];
}

export function PolicyPage({ title, sections }: PolicyPageProps) {
  return (
    <>
      <Nav />
      <main className="site-shell py-16 md:py-24">
        <article className="mx-auto max-w-3xl">
          <p className="label">OpenHouseFX · Last updated November 9, 2026</p>
          <h1 className="editorial-heading mt-5">{title}</h1>
          <nav aria-label="Policy navigation" className="my-8 flex flex-wrap gap-5 text-sm text-gold-300">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">Terms and Conditions</Link>
            <Link href="/sms-terms">SMS Terms</Link>
          </nav>
          {sections.map(([heading, body], index) => (
            <section key={heading} className="mt-8">
              <h2 className="text-xl font-semibold">{index + 1}. {heading}</h2>
              <p className="mt-3 leading-relaxed text-ink-dim">{body}</p>
            </section>
          ))}
          <section className="mt-10 border-t border-line pt-8">
            <h2 className="text-xl font-semibold">Contact OpenHouseFX</h2>
            <address className="mt-3 not-italic leading-relaxed text-ink-dim">
              95 Bristol Street, 1D, Waterbury, CT 06708-4969, United States<br />
              <a href="mailto:info@openhousefx.com">info@openhousefx.com</a><br />
              <a href="tel:+18888150017">(888) 815-0017</a>
            </address>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
