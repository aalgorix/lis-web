import { Card, CardContent } from '@/components/ui/card';
import { Star, User } from 'lucide-react';

const testimonials = [
  {
    rating: 5,
    text: "Our students now get structured, on-demand support after school hours without drifting away from the curriculum. The platform feels purpose-built for our classrooms.",
    author: "Aditi Menon",
    role: "Academic Coordinator, LIS",
    gradient: "from-primary/5 to-white",
    border: "border-primary/10 hover:border-primary/30",
    iconBg: "bg-primary",
  },
  {
    rating: 5,
    text: "As a teacher, I can quickly spot where students are struggling and assign focused revision. It saves time and improves class outcomes.",
    author: "Neha Sharma",
    role: "Senior Teacher, LIS",
    gradient: "from-accent/5 to-white",
    border: "border-accent/10 hover:border-accent/30",
    iconBg: "bg-accent",
  },
  {
    rating: 5,
    text: "As a parent, I can see learning progress clearly and my child stays engaged with guided AI support instead of random internet content.",
    author: "Nadia Al-Hassan",
    role: "Parent Representative",
    gradient: "from-green-500/5 to-white",
    border: "border-green-500/10 hover:border-green-500/30",
    iconBg: "bg-green-500",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary mb-4" data-testid="testimonials-title">
            School Community Voices <span className="text-gradient">on the LIS Experience</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted px-4" data-testid="testimonials-description">
            Real feedback from school life, focused on learning quality and student progress.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className={`bg-gradient-to-br ${testimonial.gradient} p-6 sm:p-8 border ${testimonial.border} transition-all`}
              data-testid={`testimonial-card-${index}`}
            >
              <CardContent className="p-0">
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted mb-6 italic" data-testid={`testimonial-text-${index}`}>
                  "{testimonial.text}"
                </p>
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${testimonial.iconBg} rounded-full flex items-center justify-center`}>
                    <User className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-secondary" data-testid={`testimonial-author-${index}`}>
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-muted" data-testid={`testimonial-role-${index}`}>
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
