import { Button } from '@/components/ui/button';
import { ChevronDown, Compass, Landmark, Sparkles, Users } from 'lucide-react';
import { Link } from 'wouter';
import courseVideo from '@assets/video (2).mp4';

export default function HeroSection() {
  const scrollToNext = () => {
    const nextSection = document.getElementById('courses');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden" data-testid="hero-section">
      {/* Background Video */}
      <video
        autoPlay
        muted 
        loop 
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 scale-105"
        data-testid="hero-background-video"
      >
        <source src={courseVideo} type="video/mp4" />
      </video>

      {/* Video Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#04142b]/85 via-[#071f41]/70 to-[#0a2f5f]/85 z-10" />

      <div className="relative z-20 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-4xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 mb-6">
                
                <span className="text-xs sm:text-sm tracking-wide text-white/90"></span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white" data-testid="hero-title">
                The AI Campus for
                <span className="block bg-gradient-to-r from-cyan-200 to-amber-200 bg-clip-text text-transparent">Learners International School</span>
              </h1>

              <p className="mt-6 text-base sm:text-lg lg:text-xl text-white/90 max-w-3xl">
                A premium, school-branded platform for students, parents, and teachers: syllabus-aligned guidance,
                measurable progress analytics, and reliable 24x7 learner support for daily classroom excellence.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
                <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">
                  <p className="text-2xl font-bold text-white">24x7</p>
                  <p className="text-xs text-white/80">Learner Assistance</p>
                </div>
                <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">
                  <p className="text-2xl font-bold text-white">Multi-Curriculum</p>
                  <p className="text-xs text-white/80">School + Exam Tracks</p>
                </div>
                <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">
                  <p className="text-2xl font-bold text-white">School Ready</p>
                  <p className="text-xs text-white/80">For Teachers and Parents</p>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center lg:items-start justify-center lg:justify-start">
                <Link href="/organization-contact">
                  <Button className="w-full sm:w-auto rounded-full bg-white text-[#0a2f5f] hover:bg-slate-100 font-semibold px-7 py-6 text-base">
                    <Landmark className="w-5 h-5 mr-2" />
                    Book School Demo
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#11b4d1] to-[#0c84b8] text-white hover:from-[#1499b2] hover:to-[#0b709d] font-semibold px-7 py-6 text-base">
                    <Users className="w-5 h-5 mr-2" />
                    Explore Programs
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" className="w-full sm:w-auto rounded-full border-white/60 bg-transparent text-white hover:bg-white/10 font-semibold px-7 py-6 text-base">
                    <Compass className="w-5 h-5 mr-2" />
                    Why LIS Stands Out
                  </Button>
                </Link>
              </div>
            </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
            <button
              onClick={scrollToNext}
              className="animate-bounce-slow text-white/70 hover:text-white transition-all"
              data-testid="scroll-indicator"
            >
              <ChevronDown className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}