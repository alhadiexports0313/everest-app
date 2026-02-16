import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-display-2 font-bold text-charcoal-900 mb-6 tracking-tight">
            Contact
          </h1>
          <p className="text-lg text-stone-700 leading-relaxed font-light">
            Reach out for wholesale inquiries, order support, or product questions.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="p-6 rounded-2xl glass-card border border-stone-200/50 shadow-soft">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-primary-700 mt-1" />
                <div>
                  <h3 className="font-display text-lg font-bold text-charcoal-900 mb-1">
                    Location
                  </h3>
                  <p className="text-stone-700">Gilgit-Baltistan, Pakistan</p>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-2xl glass-card border border-stone-200/50 shadow-soft">
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-primary-700 mt-1" />
                <div>
                  <h3 className="font-display text-lg font-bold text-charcoal-900 mb-1">
                    Email
                  </h3>
                  <p className="text-stone-700">info@everestorganicshilajet.com</p>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-2xl glass-card border border-stone-200/50 shadow-soft">
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-primary-700 mt-1" />
                <div>
                  <h3 className="font-display text-lg font-bold text-charcoal-900 mb-1">
                    Phone
                  </h3>
                  <p className="text-stone-700">+92 300 123 4567</p>
                </div>
              </div>
            </div>
          </div>
          <form className="p-8 rounded-2xl glass-card border border-stone-200/50 shadow-soft space-y-5">
            <div>
              <label className="block text-sm font-medium text-charcoal-900 mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-stone-200 bg-white px-4 py-3 text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal-900 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-lg border border-stone-200 bg-white px-4 py-3 text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal-900 mb-2">
                Message
              </label>
              <textarea
                rows={5}
                className="w-full rounded-lg border border-stone-200 bg-white px-4 py-3 text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="How can we help?"
              />
            </div>
            <button className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-700 to-primary-800 text-white font-semibold rounded-lg shadow-premium hover:shadow-premium-lg transition-all">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
