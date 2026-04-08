import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Users, Award, ArrowRight, Notebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

const courseCategories = [
  {
    title: 'Cambridge & IB Core Subjects',
    description: 'Board-aligned Cambridge and IB learning tracks for strong conceptual foundations and international readiness.',
    icon: Notebook,
    courses: ['Cambridge English', 'IB English', 'Cambridge Mathematics', 'IB Mathematics', 'Cambridge Science'],
    color: 'from-[#155e75] to-[#0e7490]',
    href: '/courses?category=schools&item=cambridge-ib-core'
  },
  {
    title: 'K-12 School Pathways',
    description: 'Structured tracks for primary, middle, and senior learners with board-aligned sequencing.',
    icon: Users,
    courses: ['Math Mastery', 'STEM Foundations', 'Language Fluency', 'Social Science', 'Exam Readiness'],
    color: 'from-[#0f7aab] to-[#12a6c8]',
    href: '/courses?category=schools'
  },
  {
    title: 'Global Curriculum Programs',
    description: 'Learning journeys tuned for international pedagogies and cross-country school systems.',
    icon: BookOpen,
    courses: ['Cambridge Primary', 'Cambridge Lower Secondary', 'IB MYP Preparation', 'IB DP Readiness', 'Academic Writing'],
    color: 'from-[#0d4f8b] to-[#0f67a6]',
    href: '/courses?category=language'
  },
  {
    title: 'Future Skills & Competitive Prep',
    description: 'School-ready modules for advanced skills, scholarships, and entrance exam momentum.',
    icon: Award,
    courses: ['Coding Foundations', 'AI Literacy', 'Problem Solving', 'Career Readiness', 'Competitive Exams'],
    color: 'from-[#c6721d] to-[#d88a2a]',
    href: '/courses?category=skills'
  }
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  },
};

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
};

export default function CoursesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px 0px -100px 0px",
    amount: 0.2
  });

  return (
    <section id="courses" className="py-20 bg-gradient-to-br from-[#f2f8ff] to-[#ffffff] dark:from-gray-900 dark:to-gray-800" data-testid="courses-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Programs Built for <span className="bg-gradient-to-r from-[#0f67a6] to-[#12a6c8] bg-clip-text text-transparent">Learners International School</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A custom catalog designed for learner outcomes, school operations, and parent confidence.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {courseCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative p-8">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${category.color} mb-6`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#0f67a6] group-hover:to-[#12a6c8] group-hover:bg-clip-text transition-all duration-300">
                    {category.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Course List */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Popular Subjects:</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.courses.slice(0, 3).map((course, courseIndex) => (
                        <span
                          key={courseIndex}
                          className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                        >
                          {course}
                        </span>
                      ))}
                      {category.courses.length > 3 && (
                        <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                          +{category.courses.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link href={category.href}>
                    <Button
                      className="w-full group-hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-[#0d4f8b] to-[#12a6c8] hover:from-[#0b4578] hover:to-[#1092b0] text-white"
                    >
                      View Learning Path
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        {/* <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-16"
        >
          <Link href="/courses">
            <Button
              size="lg"
              className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              View All Courses
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div> */}
      </div>
    </section>
  );
}
