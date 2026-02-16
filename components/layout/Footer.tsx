import Link from "next/link";
import { Mountain, Mail, MapPin, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-premium text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Mountain className="w-6 h-6" />
              <span className="font-display text-xl font-bold">Everest Organic</span>
            </div>
            <p className="text-neutral-300 text-sm leading-relaxed">
              Premium Himalayan Shilajet from Gilgit-Baltistan. Authentic, pure, and
              backed by science.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-neutral-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-neutral-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#products" className="text-neutral-300 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="#science" className="text-neutral-300 hover:text-white transition-colors">
                  Science & Research
                </Link>
              </li>
              <li>
                <Link href="#origin" className="text-neutral-300 hover:text-white transition-colors">
                  Our Origin
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-neutral-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#contact" className="text-neutral-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-neutral-300 hover:text-white transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="#" className="text-neutral-300 hover:text-white transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="text-neutral-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Gilgit-Baltistan, Pakistan</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <a href="mailto:info@everestorganicshilajet.com" className="hover:text-white transition-colors">
                  info@everestorganicshilajet.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-700 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-neutral-400 text-sm">
            © {currentYear} Everest Organic Shilajet. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
