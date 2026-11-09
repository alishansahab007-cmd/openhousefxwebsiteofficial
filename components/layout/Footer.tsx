import Image from "next/image";
import Link from "next/link";
import { FOOTER } from "@/lib/content";
import { MEDIA } from "@/lib/media";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./footer.module.css";

const LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms and Conditions" },
  { href: "/sms-terms", label: "SMS Terms" },
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#packages", label: "Packages" },
  { href: "/#technology", label: "Technology" },
];

const CONTACTS = [
  {
    category: "01 / Customer support",
    name: "Customer Service",
    description: "Questions about our services, pricing, or an upcoming listing? Start here.",
    phone: "(888) 815-0017",
    telephone: "+18888150017",
    emails: [FOOTER.email],
    icon: "support",
  },
  {
    category: "02 / Client relations",
    name: "Administration",
    description: "Already working with OpenhouseFX or need to speak with our administration team? Contact us directly.",
    phone: "(203) 557-7077",
    telephone: "+12035577077",
    emails: ["alishan@openhousefx.com", "wade@openhousefx.com"],
    icon: "administration",
  },
] as const;

const SOCIAL_LINKS = [
  { label: "OpenHouseFX on Instagram", href: "https://www.instagram.com/openhousefx_", icon: "instagram" },
  { label: "OpenHouseFX on Facebook", href: "https://www.facebook.com/openhousefx", icon: "facebook" },
] as const;

function FooterIcon({ icon }: { icon: "support" | "administration" | "instagram" | "facebook" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icon === "support" ? <path d="M4 13v-2a8 8 0 0 1 16 0v2M4 11H3v7h4v-7H4Zm16 0h1v7h-4v-7h3Zm0 7c0 3-3 3-6 3h-2" /> : null}
      {icon === "administration" ? <path d="M3 7h18v13H3V7Zm5 0V4h8v3M3 12a20 20 0 0 0 18 0M10 13h4v3h-4v-3Z" /> : null}
      {icon === "instagram" ? <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.25" cy="6.75" r=".6" fill="currentColor" stroke="none" /></> : null}
      {icon === "facebook" ? <path d="M14 21v-8h3l.5-4H14V7c0-1 .4-1.5 1.5-1.5H18V2.2C17.4 2.1 16.1 2 15 2c-3.2 0-5 1.8-5 5v2H7v4h3v8h4Z" /> : null}
    </svg>
  );
}

export function Footer() {
  return (
    <footer id="contact" className={styles.footer} aria-label="OpenHouseFX contact and company information">
      <div className="site-shell">
        <Reveal stagger={0.09} className={styles.brand}>
          <Image src={MEDIA.logoLockup} alt="OpenHouseFX" width={960} height={458} sizes="(min-width: 1024px) 260px, (min-width: 640px) 220px, 190px" className={styles.logo} />
          <p className={styles.eyebrow}>{FOOTER.tagline}</p>
        </Reveal>

        <Reveal className={styles.founder}>
          <h2 className={styles.eyebrow}>A note from our founder</h2>
          <blockquote>
            <p>We built OpenhouseFX with a simple belief: real estate professionals shouldn&apos;t have to juggle endless tools and vendors to bring a listing to life. Our mission is to make property media simpler today, while building the technology for a more connected tomorrow.</p>
          </blockquote>
          <span className={styles.signature} aria-hidden="true" />
        </Reveal>

        <section className={styles.contact} aria-labelledby="footer-contact-heading">
          <Reveal className={styles.contactIntro}>
            <p className={styles.eyebrow}>Let&apos;s stay connected</p>
            <h2 id="footer-contact-heading">The right conversation starts here.</h2>
            <p>Whether you&apos;re preparing your next listing or need assistance with an existing project, we&apos;re here to help.</p>
          </Reveal>

          <Reveal stagger={0.12} className={styles.cards}>
            {CONTACTS.map((contact) => (
              <article className={styles.card} key={contact.name}>
                <div className={styles.cardTop}>
                  <p className={styles.eyebrow}>{contact.category}</p>
                  <span className={styles.contactIcon}><FooterIcon icon={contact.icon} /></span>
                </div>
                <h3>{contact.name}</h3>
                <p className={styles.description}>{contact.description}</p>
                <div className={styles.contactLinks}>
                  <a className={styles.phone} href={`tel:${contact.telephone}`}>{contact.phone}</a>
                  <div className={styles.emails}>
                    {contact.emails.map((email) => <a key={email} href={`mailto:${email}`}>{email}</a>)}
                  </div>
                </div>
              </article>
            ))}
          </Reveal>
        </section>

        <div className={styles.bottom}>
          <nav aria-label="Footer navigation" className={styles.navigation}>
            {LINKS.map((link) => link.href.includes("#")
              ? <a key={link.href} href={link.href}>{link.label}</a>
              : <Link key={link.href} href={link.href}>{link.label}</Link>)}
          </nav>
          <div className={styles.closing}>
            <p>© {new Date().getFullYear()} OpenHouseFX. All rights reserved.</p>
            <nav aria-label="OpenHouseFX social profiles" className={styles.social}>
              {SOCIAL_LINKS.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}><FooterIcon icon={link.icon} /></a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
