import Link from "next/link";
import { Mountain, Mail, MapPin, Instagram, Facebook, MessageCircle } from "lucide-react";
import { tServer } from "@/lib/i18n-server";

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const t = await tServer();

  return (
    <footer className="bg-gradient-forest text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center space-x-2">
              <Mountain className="w-6 h-6 text-accent-400" />
              <span className="font-display text-xl font-bold tracking-tight">
                {t("footer.brandName")}
              </span>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed font-light">
              {t("footer.brandDescription")}
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-stone-400 hover:text-accent-400 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-stone-400 hover:text-accent-400 transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-5 text-stone-100">{t("footer.quickLinksTitle")}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/products" className="text-stone-300 hover:text-white transition-colors duration-300">
                  {t("footer.quickLinks.products")}
                </Link>
              </li>
              <li>
                <Link href="/authenticity-quality" className="text-stone-300 hover:text-white transition-colors duration-300">
                  {t("footer.quickLinks.authenticity")}
                </Link>
              </li>
              <li>
                <Link href="/knowledge-hub" className="text-stone-300 hover:text-white transition-colors duration-300">
                  {t("footer.quickLinks.knowledge")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-stone-300 hover:text-white transition-colors duration-300">
                  {t("footer.quickLinks.about")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-5 text-stone-100">{t("footer.supportTitle")}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/contact" className="text-stone-300 hover:text-white transition-colors duration-300">
                  {t("footer.support.contact")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-stone-300 hover:text-white transition-colors duration-300">
                  {t("footer.support.shipping")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-stone-300 hover:text-white transition-colors duration-300">
                  {t("footer.support.returns")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-stone-300 hover:text-white transition-colors duration-300">
                  {t("footer.support.faq")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-5 text-stone-100">{t("footer.contactTitle")}</h3>
            <ul className="space-y-3 text-sm text-stone-300">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{t("footer.location")}</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:everestorganicshilajet@gmail.com"
                  className="hover:text-white transition-colors duration-300"
                >
                  {t("footer.email")}
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MessageCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <a
                  href="https://wa.me/923454490326"
                  className="hover:text-white transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("footer.whatsapp")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-800/50 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-stone-400 text-sm font-light">
            © {currentYear} {t("footer.rights")}
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="#" className="text-stone-400 hover:text-stone-300 transition-colors duration-300">
              {t("footer.privacy")}
            </Link>
            <Link href="#" className="text-stone-400 hover:text-stone-300 transition-colors duration-300">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
