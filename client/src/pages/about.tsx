import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white px-4 py-16 sm:px-6 lg:px-8" data-testid="about-page">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">About Learners International School</h1>
        <h2 className="mt-6 text-2xl font-semibold leading-snug text-gray-900 sm:text-3xl">
          Building AI that runs on a system of
          <span className="block">Judgements & Reasons</span>
        </h2>
        <p className="mt-6 text-base leading-relaxed text-gray-700 sm:text-lg">
          Learners International School uses artificial intelligence to deliver personalized learning experiences for every Student/Learner. Here AI is not a smart Chatbot but an entire organisation which is based on fine judgement in a precise way.with its advanced core design principles.
        </p>

        <div className="mt-10">
          <Link href="/courses">
            <Button className="px-8 py-6 text-base font-semibold">Start Learning Free</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
