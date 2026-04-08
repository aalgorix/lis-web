import Navigation from '@/components/navigation';
import HeroSection from '@/components/sections/hero2';
import CoursesSection from '@/components/sections/courses';
import FeaturesSection from '@/components/sections/features';
import HowItWorksSection from '@/components/sections/how-it-works';
import PartnersSection from '@/components/sections/partners';
import AboutSection from '@/components/sections/about';
import TestimonialsSection from '@/components/sections/testimonials';
import ContactSection from '@/components/sections/contact';
import BlogSection from '@/components/sections/blogs';
import Footer from '@/components/sections/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-professor-background" data-testid="home-page">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <CoursesSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PartnersSection />
      <TestimonialsSection />
      <ContactSection />
      <BlogSection />
      <Footer />
    </div>
  );
}
