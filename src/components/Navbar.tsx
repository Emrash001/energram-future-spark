import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { Menu, X, LogIn, LogOut, ChevronDown, User } from "lucide-react";
import EnergamLogo from "./EnergamLogo";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut, isAdmin, isSuperAdmin } = useGoogleAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (user?.displayName) {
      const nameParts = user.displayName.split(' ');
      if (nameParts.length >= 2) {
        return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
      }
      return nameParts[0][0].toUpperCase();
    } else if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  // Get user avatar image
  const getUserAvatar = () => {
    return user?.photoURL || '';
  };

  // Check if the link is active
  const isActiveLink = (path: string) => {
    // For the home page
    if (path === "/" && location.pathname === "/") {
      return true;
    }
    // For other pages, check if the pathname starts with the path
    // but not for root "/" as it would match everything
    if (path !== "/" && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };

  const navLinks = [
    { text: "Technology", href: "/technology" },
    { text: "Pricing", href: "/pricing" },
    { text: "App", href: "/download" },
    { text: "Learn More", href: "/learn-more" },
    { text: "Product demo", href: "/see-in-action" },
    { text: "Contact", href: "/contact" },
    { text: "FAQ", href: "/faq" },
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
                className={`relative font-medium transition-colors ${
                  isActiveLink(link.href) 
                    ? "text-foreground after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-solar-500 after:to-tech-500" 
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {link.text}
              </Link>
            ))}
            <ThemeToggle />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative flex items-center gap-2 hover:bg-background/80">
                    <Avatar className="h-8 w-8">
                      {getUserAvatar() && (
                        <AvatarImage src={getUserAvatar()} alt={user.displayName || 'User'} />
                      )}
                      <AvatarFallback className="bg-gradient-to-br from-solar-500 to-tech-500 text-white">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline-block text-sm">{user.displayName || user.email?.split('@')[0]}</span>
                    <span className="w-2 h-2 absolute right-0 top-0 bg-green-500 rounded-full"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="w-full cursor-pointer flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Admin Dashboard
                        {isSuperAdmin && (
                          <span className="ml-2 text-xs bg-solar-500 text-white px-2 py-0.5 rounded-full">
                            Super
                          </span>
                        )}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/login")}
                className="flex items-center gap-2"
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Button>
            )}

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
            
            {user && (
              <Avatar className="h-8 w-8">
                {getUserAvatar() && (
                  <AvatarImage src={getUserAvatar()} alt={user.displayName || 'User'} />
                )}
                <AvatarFallback className="bg-gradient-to-br from-solar-500 to-tech-500 text-white">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
            )}
            
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
                className={`block py-2 font-medium ${
                  isActiveLink(link.href)
                    ? "text-foreground relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-1 before:bg-gradient-to-b before:from-solar-500 before:to-tech-500 before:rounded-full"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {link.text}
              </Link>
            ))}
            
            {user ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className={`flex items-center py-2 font-medium ${
                      isActiveLink("/admin")
                        ? "text-foreground relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-1 before:bg-gradient-to-b before:from-solar-500 before:to-tech-500 before:rounded-full"
                        : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    <User className="inline-block mr-2 h-4 w-4" />
                    Admin Dashboard
                    {isSuperAdmin && (
                      <span className="ml-2 text-xs bg-solar-500 text-white px-2 py-0.5 rounded-full">
                        Super
                      </span>
                    )}
                  </Link>
                )}
                <button
                  onClick={signOut}
                  className="flex items-center py-2 font-medium text-foreground/80 hover:text-foreground w-full"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={`flex items-center py-2 font-medium ${
                  isActiveLink("/login")
                    ? "text-foreground relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-1 before:bg-gradient-to-b before:from-solar-500 before:to-tech-500 before:rounded-full"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                <LogIn className="mr-2 h-4 w-4" />
                <span>Login</span>
              </Link>
            )}
            
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
