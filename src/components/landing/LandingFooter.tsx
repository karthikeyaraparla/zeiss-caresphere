import { Link } from 'react-router-dom';
import { Microscope, ExternalLink, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const footerLinks = {
  Product: [
    { label: 'Features', href: '/features' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Technology', href: '/technology' },
    { label: 'Pricing', href: '#' },
    { label: 'Changelog', href: '#' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Customers', href: '/customers-page' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  Support: [
    { label: 'Documentation', href: '#' },
    { label: 'Knowledge Base', href: '#' },
    { label: 'API Reference', href: '#' },
    { label: 'Status', href: '#' },
    { label: 'Security', href: '#' },
  ],
};

export function LandingFooter() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 font-bold mb-4">
              <div className="flex items-center justify-center size-8 rounded-lg bg-primary">
                <Microscope className="size-4 text-primary-foreground" />
              </div>
              <span className="text-foreground">
                ZEISS <span className="text-primary">ZePSI</span>
              </span>
              <span className="text-xs font-medium bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.5 rounded">AI</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
              AI-powered Predictive Support Intelligence Platform for enterprise asset management and preventive maintenance.
            </p>
            <p className="text-xs text-muted-foreground mb-2">
              Built for the <span className="text-primary font-medium">Carl ZEISS Innovate @2030</span> Hackathon
            </p>
            <div className="flex items-center gap-3 mt-4">
              {[ExternalLink, ExternalLink, ExternalLink, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex items-center justify-center size-8 rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-foreground mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} ZEISS CareSphere AI. Built for Carl ZEISS Innovate @2030 Hackathon.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
