'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Users, CheckCircle2, MapPin, Calendar, Award, Clock, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const InteractiveWorkflow: React.FC = () => {
  const [activeRole, setActiveRole] = useState<'worker' | 'organizer'>('worker');

  const workerSteps = [
    {
      icon: <User className="w-5 h-5 text-brand" />,
      title: 'Create Your Profile',
      desc: 'Fill in your experience, location in Kerala, and languages. Instantly earn your "Beginner" badge.',
    },
    {
      icon: <MapPin className="w-5 h-5 text-brand" />,
      title: 'Browse & Apply Locally',
      desc: 'Find catering, decoration, or hospitality jobs near your district. Apply with a single tap.',
    },
    {
      icon: <Award className="w-5 h-5 text-brand" />,
      title: 'Work & Build Reputation',
      desc: 'Complete jobs, get high ratings, improve your attendance score, and unlock Silver, Gold, or Platinum badges.',
    },
  ];

  const organizerSteps = [
    {
      icon: <Calendar className="w-5 h-5 text-brand" />,
      title: 'Post Job Details',
      desc: 'Specify date, salary, report time, venue, and dress code (e.g., black pants and white shirt).',
    },
    {
      icon: <Users className="w-5 h-5 text-brand" />,
      title: 'Filter & Accept Workers',
      desc: 'Rank applicants using our smart algorithm: experience, rating, distance, and attendance history.',
    },
    {
      icon: <Clock className="w-5 h-5 text-brand" />,
      title: 'Mark Attendance & Rate',
      desc: 'Mark present/late/absent on site. Rate workers to maintain a trustworthy local marketplace.',
    },
  ];

  const currentSteps = activeRole === 'worker' ? workerSteps : organizerSteps;

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
          How WorkBridge Works
        </h2>
        <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
          Choose your role and see how easily you can get started on our platform.
        </p>
        
        {/* Toggle Button */}
        <div className="inline-flex p-1 mt-8 bg-gray-100 rounded-xl border border-gray-200">
          <button
            onClick={() => setActiveRole('worker')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
              activeRole === 'worker'
                ? 'bg-white text-brand shadow-sm glow-orange'
                : 'text-gray-500 hover:text-foreground'
            }`}
          >
            <User className="w-4 h-4" />
            <span>For Workers</span>
          </button>
          <button
            onClick={() => setActiveRole('organizer')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
              activeRole === 'organizer'
                ? 'bg-white text-brand shadow-sm glow-orange'
                : 'text-gray-500 hover:text-foreground'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>For Event Teams</span>
          </button>
        </div>
      </div>

      {/* Steps Display */}
      <div className="relative">
        <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-gray-200 hidden md:block" />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRole}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {currentSteps.map((step, idx) => (
              <div key={idx} className="flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-6 relative">
                {/* Number / Icon circle */}
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-light border border-brand/20 shadow-sm z-10 shrink-0">
                  {step.icon}
                </div>
                
                {/* Text Content */}
                <div className="flex-1">
                  <span className="text-xs font-bold text-brand uppercase tracking-wider">
                    Step {idx + 1}
                  </span>
                  <h3 className="text-xl font-bold text-foreground mt-0.5">{step.title}</h3>
                  <p className="text-gray-600 mt-1 max-w-2xl">{step.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-12 text-center">
        <Button variant="primary" size="lg" className="group">
          <span>Get Started Now</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};
