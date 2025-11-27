import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[hsl(140,50%,25%)] text-white">
      {/* Pre-footer CTA Section */}
      <section className="bg-[hsl(140,35%,92%)] text-foreground py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Join Us in Cultivating a Sustainable Future
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Partner with Deepwoods to create lasting environmental impact through innovative green solutions.
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-accent text-primary-foreground font-medium text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
          >
            Start a Partnership
          </Button>
        </div>
      </section>

      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact Column */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-white/10 p-2 rounded-lg">
                <Leaf className="w-6 h-6" />
              </div>
              <span className="text-xl font-semibold">Deepwoods</span>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed">
              Leading the way in sustainable green initiatives and low emission ocean transportation.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/80">
                <Mail className="w-4 h-4" />
                <span>contact@deepwoods.com</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <MapPin className="w-4 h-4" />
                <span>123 Green Avenue, Earth City</span>
              </div>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <nav className="space-y-3">
              <a href="#home" className="block text-white/80 hover:text-white transition-colors">
                Home
              </a>
              <a href="#services" className="block text-white/80 hover:text-white transition-colors">
                Services
              </a>
              <a href="#about" className="block text-white/80 hover:text-white transition-colors">
                About Us
              </a>
              <a href="#projects" className="block text-white/80 hover:text-white transition-colors">
                Our Projects
              </a>
              <a href="#contact" className="block text-white/80 hover:text-white transition-colors">
                Contact
              </a>
            </nav>
          </div>

          {/* Legal & Social Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Connect With Us</h3>
            <div className="flex gap-4 mb-6">
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <div className="space-y-2 text-sm text-white/70">
              <a href="#" className="block hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/70 text-sm">
            © {new Date().getFullYear()} Deepwoods Green Initiatives Pvt. Ltd. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
