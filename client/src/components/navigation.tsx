import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Link, useLocation } from 'wouter';
import logoPath from "@assets/leaners-international-school-logo.png";
// import { useNavigate } from "react-router-dom";

export default function Navigation() {
  // const navigate = useNavigate();

  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [sessionUser, setSessionUser] = useState<null | { username?: string; email?: string }>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  // Fetch session to determine if an Account button should be shown globally
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/session', { credentials: 'include' });
        const data = await res.json();
        if (!cancelled && res.ok && data?.authenticated) {
          setSessionUser({ username: data.user?.username, email: data.user?.email });
        }
      } catch {
        // ignore errors
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const textColor = 'text-white';
  const hoverColor = 'hover:text-white';
  const isTransparentNavbar = location === '/' && !isScrolled && !isMenuOpen;
  const navbarContainerClass = isTransparentNavbar
    ? 'flex justify-between items-center py-1.5 px-4 sm:py-1.5 bg-transparent rounded-full'
    : 'flex justify-between items-center py-1.5 px-4 sm:py-1.5 bg-black/90 rounded-full';

  return (
    <nav className={`fixed top-2 left-0 right-0 z-50 transition-all duration-300 bg-transparent`} data-testid="main-navigation">
      <div className="max-w-10xl mx-auto  px-4 sm:px-6 lg:px-10">
        <div className={navbarContainerClass}>
          <div className="flex items-center" data-testid="logo-brand">
            <Link href="/">
              <img 
                src={logoPath} 
                alt="Learners International School Logo" 
                className="h-12 sm:h-14 w-auto lis-logo-white cursor-pointer hover:scale-105 transition-transform duration-200"
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-8">
            {/* Courses Link */}
            <Link href="/courses">
              <button 
                className={`${textColor} ${hoverColor} transition-colors hover:scale-110`}
                data-testid="nav-courses"
              >
                Courses
              </button>
            </Link>

            {/* Campus Life Button */}
            <Link href="/how-it-works">
              <button 
                className={`${textColor} ${hoverColor} transition-colors hover:scale-110`}
                data-testid="nav-how-it-works"
              >
                AI Campus
              </button>
            </Link>

            {/* Career GPT Link */}
            {/* <Link href="/career-gpt">
              <button 
                className={`${textColor} ${hoverColor} transition-colors hover:scale-110`}
                data-testid="nav-career-gpt"
              >
                Career GPT
              </button>
            </Link> */}

            {/* Blog Link */}
            <Link href="/blogs">
              <button 
                className={`${textColor} ${hoverColor} transition-colors hover:scale-110`}
                data-testid="nav-blog"
              >
                Blog
              </button>
            </Link>

          </div>
          
          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Account (if signed in) or Sign In */}
            {sessionUser ? (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <button
                    className="relative flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm transition-all bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 hover:scale-105 shadow-lg"
                    data-testid="button-account"
                  >
                    {sessionUser.username ? sessionUser.username.charAt(0).toUpperCase() : 'U'}
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="w-64 bg-black/90 text-white border border-white/20">
                  <div className="space-y-1 text-sm">
                    <div className="mt-1">
                      <Link href="/courses">
                        <Button size="sm" className="w-full">Go to Courses</Button>
                      </Link>
                    </div>
                    <div className="mt-1">
                      <Button
                        size="sm"
                        variant="destructive"
                        className="w-full"
                        onClick={async () => {
                          try {
                            await fetch('/api/logout', { method: 'POST', credentials: 'include' });
                          } finally {
                            window.location.href = '/';
                          }
                        }}
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ) : (
              <Link href="/signin/student">
                <Button
                  className="px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 transform hover:scale-105 bg-white text-black hover:bg-gray-100"
                  data-testid="button-sign-in"
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${textColor} ${hoverColor} transition-colors`}
              data-testid="mobile-menu-toggle"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden rounded-lg mt-2 p-4 bg-black/90 backdrop-blur-md shadow-lg transition-all" data-testid="mobile-menu">
            {/* Mobile Courses Link */}
            <Link href="/courses">
              <button className={`block py-2 ${textColor} ${hoverColor} transition-colors w-full text-left border-b border-white/20 pb-2 mb-2`}>
                Courses
              </button>
            </Link>

            {/* Mobile Campus Life Link */}
            <Link href="/how-it-works">
              <button className={`block py-2 ${textColor} ${hoverColor} transition-colors w-full text-left border-b border-white/20 pb-2 mb-2`}>
                AI Campus
              </button>
            </Link>

            {/* Mobile Blog Link */}
            <Link href="/blogs">
              <button className={`block py-2 ${textColor} ${hoverColor} transition-colors w-full text-left border-b border-white/20 pb-2 mb-2`}>
                Blog
              </button>
            </Link>

            {!sessionUser && (
              <Link href="/signin/student">
                <Button
                  className="w-full mt-2 mb-2 bg-white text-black hover:bg-gray-100"
                >
                  Sign In
                </Button>
              </Link>
            )}
            {sessionUser ? (
              <Link href="/post-auth">
                <Button 
                  variant="outline"
                  className="w-full mt-2 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 transition-all"
                >
                  Account{sessionUser.username ? ` (${sessionUser.username})` : ''}
                </Button>
              </Link>
            ) : null}
          </div>
        )}
      </div>
    </nav>
  );
}
