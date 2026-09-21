import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { Mail, Phone, Pin, WhatsApp } from "@/components/ui/icons";
import { footerNav, site, whatsappLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto bg-ink-900 text-ink-300">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-ink-400">
              We design, supply and build bathrooms — and we publish the membrane thickness, the
              tile SKU and the ponding-test photos, because that is what separates a good bathroom
              from one that fails in year three.
            </p>

            <ul className="mt-7 space-y-3 text-[0.875rem]">
              <li>
                <a
                  href={`tel:${site.phone}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-ink-50"
                >
                  <Phone width={16} height={16} className="text-brass-400" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-ink-50"
                >
                  <Mail width={16} height={16} className="text-brass-400" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Pin width={16} height={16} className="mt-0.5 shrink-0 text-brass-400" />
                <span>
                  {site.address.street}, {site.address.city}, {site.address.state}{" "}
                  {site.address.zip}
                </span>
              </li>
            </ul>

            <a
              href={whatsappLink("Hi Brick & Bath — I'd like to talk about my bathroom.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-[10px] bg-[#25D366]/15 px-4 py-2.5 text-[0.875rem] font-medium text-[#25D366] transition-colors hover:bg-[#25D366]/25"
            >
              <WhatsApp width={17} height={17} />
              Message us on WhatsApp
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-6">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink-500">
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-2.5 text-[0.875rem]">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="transition-colors hover:text-ink-50">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-12">
            <div className="mt-4 rounded-[14px] border border-ink-700/60 bg-ink-800/50 p-6 md:flex md:items-center md:justify-between md:gap-8">
              <div>
                <p className="font-display text-lg text-ink-50">
                  Get the renovation cost guide
                </p>
                <p className="mt-1 text-[0.875rem] text-ink-400">
                  Real line-item pricing from 40 recent projects. No email gate on the first page.
                </p>
              </div>
              <form
                className="mt-4 flex gap-2 md:mt-0 md:w-80"
                action="/contact"
                method="get"
              >
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="h-11 flex-1 rounded-[10px] border border-ink-700 bg-ink-900 px-3.5 text-sm text-ink-100 outline-none transition-colors placeholder:text-ink-500 focus:border-brass-500"
                />
                <input type="hidden" name="topic" value="guide" />
                <button
                  type="submit"
                  className="h-11 shrink-0 rounded-[10px] bg-brass-500 px-4 text-sm font-medium text-ink-900 transition-colors hover:bg-brass-400"
                >
                  Send it
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-800">
        <div className="container-page flex flex-col gap-3 py-6 text-[0.75rem] text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-5">
            <li>
              <Link href="/faq" className="transition-colors hover:text-ink-300">
                Help & FAQ
              </Link>
            </li>
            <li>
              <Link href="/contact?topic=careers" className="transition-colors hover:text-ink-300">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/contact?topic=dealer" className="transition-colors hover:text-ink-300">
                Trade & dealers
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
