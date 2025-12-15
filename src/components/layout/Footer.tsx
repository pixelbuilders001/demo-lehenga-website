import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-charcoal text-ivory">
      {/* Newsletter Section */}
      <div className="border-b border-ivory/10">
        <div className="container-luxury py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-serif text-3xl md:text-4xl mb-4">Join the VANYA Family</h3>
            <p className="text-ivory/70 mb-8">
              Subscribe to receive exclusive offers, styling tips, and early access to new collections.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-ivory/10 border border-ivory/20 rounded text-ivory placeholder:text-ivory/50 focus:outline-none focus:border-gold"
              />
              <button className="btn-gold whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-luxury py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h2 className="font-serif text-3xl font-bold mb-6">VANYA</h2>
            <p className="text-ivory/70 mb-6">
              Crafting timeless elegance for the modern Indian woman. Each piece tells a story of tradition, artistry, and sophistication.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="p-2 bg-ivory/10 rounded-full hover:bg-gold hover:text-charcoal transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-ivory/10 rounded-full hover:bg-gold hover:text-charcoal transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-ivory/10 rounded-full hover:bg-gold hover:text-charcoal transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-ivory/10 rounded-full hover:bg-gold hover:text-charcoal transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {["New Arrivals", "Bridal Collection", "Festive Wear", "Party Wear", "Sale"].map((item) => (
                <li key={item}>
                  <Link to="/collection" className="text-ivory/70 hover:text-gold transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Customer Service</h4>
            <ul className="space-y-4">
              {["Track Order", "Size Guide", "Care Instructions", "Returns & Exchange", "FAQ"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-ivory/70 hover:text-gold transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-ivory/70">
                  123 Fashion Street, Shahpur Jat, New Delhi - 110049
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                <a href="tel:+919876543210" className="text-ivory/70 hover:text-gold transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                <a href="mailto:hello@vanya.in" className="text-ivory/70 hover:text-gold transition-colors">
                  hello@vanya.in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ivory/10">
        <div className="container-luxury py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-ivory/50 text-sm">
              © 2024 VANYA. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-ivory/50">
              <Link to="#" className="hover:text-gold transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-gold transition-colors">Terms of Service</Link>
              <Link to="#" className="hover:text-gold transition-colors">Shipping Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
