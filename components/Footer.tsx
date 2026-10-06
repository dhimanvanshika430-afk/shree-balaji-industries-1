import Link from "next/link";
import { nav, services, company, INQUIRY_HREF } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-line pt-20 pb-10">
      <div className="container-sbi grid md:grid-cols-[1.4fr_0.8fr_1fr_1.2fr] gap-14">
        <div>
          <p className="font-serif text-xl tracking-[0.14em]">SHREE BALAJI</p>
          <p className="text-[0.56rem] tracking-[0.5em] text-muted mt-1.5">INDUSTRIES</p>
          <p className="text-muted text-sm leading-relaxed max-w-xs mt-6">
            Modular kitchens, cupboards, wardrobes, doors and chowkhats — designed, crafted and installed from Panchkula.
          </p>
          <p className="text-muted text-xs mt-6 leading-relaxed">
            Chairman — {company.chairman}
            <br />
            Director — {company.director}
          </p>
          <a
            href={`https://instagram.com/${company.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 text-sm text-muted hover:text-clay transition-colors"
          >
            Instagram · @{company.instagram}
          </a>
        </div>

        <div>
          <p className="text-xs tracking-[0.24em] text-muted mb-5">NAVIGATE</p>
          <ul className="space-y-3 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-clay transition-colors">{n.label}</Link>
              </li>
            ))}
            <li>
              <Link href={INQUIRY_HREF} className="hover:text-clay transition-colors">Inquire</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs tracking-[0.24em] text-muted mb-5">WHAT WE MAKE</p>
          <ul className="space-y-3 text-sm">
            {services.map((s) => (
              <li key={s} className="text-paper/85">{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs tracking-[0.24em] text-muted mb-5">CONTACT</p>
          <div className="space-y-5 text-sm text-muted">
            <div>
              <p className="text-paper">Visit us</p>
              <p>{company.address.line1}</p>
              <p>{company.address.line2}</p>
            </div>
            <div className="space-y-1">
              {company.contacts.map((c) => (
                <p key={c.phone}>
                  <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="hover:text-clay transition-colors">{c.phone}</a>{" "}
                  <span className="text-xs">— {c.name}</span>
                </p>
              ))}
            </div>
            <a href={`mailto:${company.email}`} className="block break-all hover:text-clay transition-colors">
              {company.email}
            </a>
          </div>
        </div>
      </div>

      <div className="container-sbi border-t border-line mt-16 pt-8 flex flex-col md:flex-row justify-between gap-4 text-xs text-muted">
        <p>© {new Date().getFullYear()} Shree Balaji Industries. All rights reserved.</p>
        <p>Panchkula · Haryana</p>
      </div>
    </footer>
  );
}
