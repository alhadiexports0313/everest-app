import Link from "next/link";
import { Mountain, Mail, MapPin, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-forest text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center space-x-2">
              <Mountain className="w-6 h-6 text-accent-400" />
              <span className="font-display text-xl font-bold tracking-tight">Everest Organic</span>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed font-light">
              Premium Himalayan Shilajet from Gilgit-Baltistan. Authentic, pure, and
              backed by science.
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
            <h3 className="font-semibold mb-5 text-stone-100">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/products" className="text-stone-300 hover:text-white transition-colors duration-300">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/authenticity-quality" className="text-stone-300 hover:text-white transition-colors duration-300">
                  Authenticity & Quality
                </Link>
              </li>
              <li>
                <Link href="/knowledge-hub" className="text-stone-300 hover:text-white transition-colors duration-300">
                  Knowledge Hub
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-stone-300 hover:text-white transition-colors duration-300">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-5 text-stone-100">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/contact" className="text-stone-300 hover:text-white transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-stone-300 hover:text-white transition-colors duration-300">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="#" className="text-stone-300 hover:text-white transition-colors duration-300">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="text-stone-300 hover:text-white transition-colors duration-300">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-5 text-stone-100">Contact</h3>
            <ul className="space-y-3 text-sm text-stone-300">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Gilgit-Baltistan, Pakistan</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <a href="mailto:info@everestorganicshilajet.com" className="hover:text-white transition-colors duration-300">
                  info@everestorganicshilajet.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-800/50 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-stone-400 text-sm font-light">
            © {currentYear} Everest Organic Shilajet. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="#" className="text-stone-400 hover:text-stone-300 transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="#" className="text-stone-400 hover:text-stone-300 transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
