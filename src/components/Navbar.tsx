
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import EnergamLogo from "./EnergamLogo";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { text: "Technology", href: "/technology" },
    { text: "Impact", href: "#impact" },
    { text: "App", href: "/download" },
    { text: "Pricing", href: "/pricing" },
    { text: "Support", href: "#support" },
    { text: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <EnergamLogo variant="full" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.text}
                to={link.href.startsWith("#") ? `/${link.href}` : link.href}
                className="font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                {link.text}
              </Link>
            ))}
            <ThemeToggle />
            <Button 
              asChild
              className="bg-gradient-to-r from-solar-500 to-tech-500 text-white hover:from-solar-700 hover:to-tech-700 transition-all"
            >
              <Link to="/order">Order Now</Link>
            </Button>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="text-foreground"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b">
          <div className="px-4 pt-2 pb-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.text}
                to={link.href.startsWith("#") ? `/${link.href}` : link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 font-medium text-foreground/80 hover:text-foreground"
              >
                {link.text}
              </Link>
            ))}
            <Button 
              asChild
              className="w-full mt-4 bg-gradient-to-r from-solar-500 to-tech-500 text-white hover:from-solar-700 hover:to-tech-700"
            >
              <Link to="/order">Order Now</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
