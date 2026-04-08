import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqItems = [
  {
    question: 'What curriculum does Learners International School support?',
    answer:
      'The platform is designed for Cambridge and IB learning pathways, including core subjects such as English, Mathematics, Sciences, Humanities, and global skill development.',
  },
  {
    question: 'How do students access courses after enrollment?',
    answer:
      'Students can sign in from the website and directly access their assigned courses, lessons, and progress tracking from the Courses section.',
  },
  {
    question: 'Can parents monitor student progress?',
    answer:
      'Yes. Parents can review learning progress, course completion, and assessment performance through school-shared updates and dashboards.',
  },
  {
    question: 'Is the platform suitable for daily school learning?',
    answer:
      'Yes. It is intended for regular school use with Cambridge and IB-aligned support, structured course flow, and continuous student practice.',
  },
  {
    question: 'Do teachers get tools for guidance and intervention?',
    answer:
      'Teachers can use course-level insights and learner activity visibility to guide revision plans, identify support needs, and improve outcomes.',
  },
  {
    question: 'What devices are recommended for using the website?',
    answer:
      'A modern browser on desktop, laptop, tablet, or mobile works well. A stable internet connection is recommended for the best experience.',
  },
  {
    question: 'How can new families contact the school for admissions?',
    answer:
      'Families can use the Contact/Admissions section on the website to submit an enquiry and receive guidance from the school team.',
  },
  {
    question: 'Is student data secure on this platform?',
    answer:
      'The platform is built with privacy and access control in mind so that student information is handled responsibly and securely.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="faq" className="py-20 bg-white" data-testid="faq-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">Frequently Asked Questions</h2>
          <p className="text-base sm:text-lg text-muted">
            Important answers for students, parents, and teachers.
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className="rounded-2xl border border-gray-200 bg-gray-50/60 overflow-hidden"
                data-testid={`faq-item-${index}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full px-5 sm:px-6 py-4 text-left flex items-center justify-between gap-4"
                  data-testid={`faq-question-${index}`}
                >
                  <span className="text-sm sm:text-base font-semibold text-gray-900">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 text-sm sm:text-base text-gray-700 leading-relaxed" data-testid={`faq-answer-${index}`}>
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}