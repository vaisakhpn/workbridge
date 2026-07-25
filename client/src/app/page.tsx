'use client';

import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Star, 
  TrendingUp, 
  Zap, 
  CheckCircle,
  Menu,
  X,
  Sparkles,
  Percent,
  Calendar,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { InteractiveWorkflow } from '@/components/landing/InteractiveWorkflow';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();

  // Stats or Algorithm visualization data
  const algoMetrics = [
    { name: 'Experience & Badges', weight: 40, color: 'bg-brand' },
    { name: 'Attendance Reliability', weight: 25, color: 'bg-amber-500' },
    { name: 'Rating & Reviews', weight: 20, color: 'bg-emerald-500' },
    { name: 'Distance to Venue', weight: 10, color: 'bg-blue-500' },
    { name: 'Low Cancellation Rate', weight: 5, color: 'bg-indigo-500' },
  ];

  return (
    <div className="min-h-screen bg-white text-foreground flex flex-col font-sans selection:bg-brand/10 selection:text-brand">
      
      {/* BACKGROUND ORANGE GLOW DOTS */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center glow-orange text-white font-extrabold text-lg">
              W
            </div>
            <span className="text-xl font-bold tracking-tight">
              Work<span className="text-brand">Bridge</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-gray-600">
            <a href="#features" className="hover:text-brand transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-brand transition-colors">How it Works</a>
            <a href="#algorithm" className="hover:text-brand transition-colors">Ranking Algorithm</a>
            <a href="#about" className="hover:text-brand transition-colors">Expansion Plan</a>
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated && user ? (
              <>
                <span className="text-sm font-semibold text-gray-700 mr-2">
                  Hi, <span className="text-brand">{user.name}</span>
                </span>
                <Button variant="outline" size="sm" onClick={() => logout()}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm">Register Now</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-gray-500 hover:text-foreground focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-border py-4 px-6 space-y-4">
            <nav className="flex flex-col space-y-3 text-sm font-semibold text-gray-600">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand transition-colors">Features</a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand transition-colors">How it Works</a>
              <a href="#algorithm" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand transition-colors">Ranking Algorithm</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand transition-colors">Expansion Plan</a>
            </nav>
            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-subtle">
              {isAuthenticated && user ? (
                <>
                  <span className="text-sm font-semibold text-gray-700 text-center py-1">
                    Logged in as: <span className="text-brand">{user.name}</span>
                  </span>
                  <Button variant="outline" className="w-full" onClick={() => { logout(); setMobileMenuOpen(false); }}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full">
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="w-full">
                    <Button variant="primary" className="w-full">Register Now</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="primary" className="mb-4 animate-pulse">
            <Sparkles className="w-3 h-3 mr-1 text-brand fill-brand/20" />
            Launching in Kerala
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground max-w-4xl mx-auto leading-tight">
            Connecting Event Teams with <span className="gradient-text">Reliable Temporary Workers</span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Ditch endless calls and chaotic WhatsApp groups. Hire local catering, decoration, and hospitality staff who build transparent, verified work histories.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              Find Jobs Nearby
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Hire Reliable Staff
            </Button>
          </div>

          {/* Quick Metrics */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto pt-8 border-t border-gray-subtle text-center">
            <div>
              <p className="text-3xl md:text-4xl font-extrabold text-brand">Kerala-First</p>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-1">Focus Region</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-extrabold text-foreground">100%</p>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-1">Verified Badges</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-extrabold text-foreground">&lt; 5 Mins</p>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-1">Hiring Time</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-extrabold text-foreground">Zustand</p>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-1">State Mgmt</p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUE PROPOSITIONS */}
      <section id="features" className="py-20 bg-gray-subtle border-y border-gray-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
              Designed for Speed. Built on Trust.
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Traditional methods fail when workers don't show up or organizers spend hours cold-calling. WorkBridge solves this with verified workflows.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Event Organizers Card */}
            <Card hoverEffect className="p-8 bg-white flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-light flex items-center justify-center text-brand mb-6">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">For Event Teams</h3>
                <p className="text-gray-500 mt-2 text-sm">
                  Stop calling numbers one-by-one. Hire catering staff, cleaning helpers, or decorations crews in minutes.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    'Smart ranking shows top available workers first',
                    'Single-click attendance marking (Present, Late, Absent)',
                    'Automatic worker ranking based on real performance',
                    'Comprehensive booking details (dress code, meal availability)'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-brand shrink-0 mt-0.5 mr-3" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-subtle">
                <Button variant="secondary" className="w-full">Create Company Profile</Button>
              </div>
            </Card>

            {/* Workers Card */}
            <Card hoverEffect className="p-8 bg-white flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-light flex items-center justify-center text-brand mb-6">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">For Temporary Workers</h3>
                <p className="text-gray-500 mt-2 text-sm">
                  Find jobs in your local town or college area. Build a trusted profile that gets you hired faster with higher pay rates.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    'Search catering and wedding jobs in your district',
                    'A digital reputation that transfers across companies',
                    'Unlock Badges (Beginner, Bronze, Silver, Gold, Platinum)',
                    'Transparent pay rates, locations, and timings listed beforehand'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-brand shrink-0 mt-0.5 mr-3" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-subtle">
                <Button variant="secondary" className="w-full">Register as a Worker</Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (INTERACTIVE STATEFUL WORKFLOW) */}
      <section id="how-it-works" className="py-20 bg-white">
        <InteractiveWorkflow />
      </section>

      {/* ALGORITHM EXPLANATION */}
      <section id="algorithm" className="py-20 bg-gray-subtle border-y border-gray-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="primary" className="mb-4">Algorithm Spotlight</Badge>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground leading-tight">
                Our Smart Worker Ranking System
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                WorkBridge uses an automated ranking engine to list workers based on reliability, trust, and distance. This ensures event organizers get the highest-rated local teams quickly, reducing late arrivals and no-shows.
              </p>
              
              <div className="mt-8 space-y-4">
                {algoMetrics.map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-sm font-semibold text-foreground">
                      <span>{item.name}</span>
                      <span className="text-brand">{item.weight}% weight</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.weight}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-border shadow-sm space-y-6">
              <div className="flex items-center space-x-3 pb-4 border-b border-gray-subtle">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Trust Ranking Active</h3>
                  <p className="text-xs text-gray-400">Updates live after every event</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Star className="w-4 h-4 text-brand fill-brand shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">Attendance Priority</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Late arrivals and no-shows reduce attendance rating, which lowers overall match ranking instantly.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <TrendingUp className="w-4 h-4 text-brand fill-brand shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">Experience Multiplier</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Workers with over 20 completed jobs secure higher priority badges, gaining early access to premium event shifts.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="w-4 h-4 text-brand fill-brand shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">Geofenced Distance</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Workers physically residing closer to the venue are favored in sorting to guarantee on-time reporting.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP / FUTURE EXPANSION */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
            Expansion Roadmap
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Starting with wedding and catering teams, WorkBridge is designed to grow into Kerala's ultimate temporary workforce marketplace.
          </p>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: 'Decoration Workers', desc: 'Stage setters & flower art' },
              { title: 'Cleaning & Helper Staff', desc: 'Post-event cleanup & helpers' },
              { title: 'Security Staff', desc: 'Bouncers & crowd management' },
              { title: 'Hospitality Staff', desc: 'Front desk, waiters & drivers' },
            ].map((item, idx) => (
              <Card key={idx} hoverEffect className="p-6 bg-gray-subtle border border-gray-border flex flex-col justify-center items-center text-center">
                <h4 className="font-bold text-foreground">{item.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 bg-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-brand to-brand-hover rounded-3xl p-10 md:p-14 text-white text-center shadow-xl glow-orange relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            
            <h2 className="text-3xl md:text-4xl font-extrabold">Ready to Bridge the Work Gap?</h2>
            <p className="mt-4 text-brand-light max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              Sign up today. Join the modern network of event professionals and reliable gig workers in Kerala. Free registration for early partners.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Button className="bg-white text-brand hover:bg-brand-light w-full sm:w-auto font-bold px-8 py-3">
                Register as Worker
              </Button>
              <Button className="bg-transparent border border-white hover:bg-white/10 w-full sm:w-auto font-bold px-8 py-3">
                Register as Company
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto bg-gray-950 text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white font-extrabold text-sm">
                  W
                </div>
                <span className="text-lg font-bold tracking-tight">
                  Work<span className="text-brand">Bridge</span>
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Kerala's first specialized marketplace connecting event organizers with trusted temporary event staff and catering helpers.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-200">For Workers</h4>
              <ul className="mt-4 space-y-2 text-xs text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Find Local Jobs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How Badges Work</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kerala Districts List</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Worker FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-200">For Companies</h4>
              <ul className="mt-4 space-y-2 text-xs text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Post Catering Jobs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Hiring Algorithm Details</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing & Plans</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Company FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-200">Project Tech Stack</h4>
              <ul className="mt-4 space-y-2 text-xs text-gray-400">
                <li>Next.js 15 (App Router)</li>
                <li>Express.js (Node.js)</li>
                <li>Zustand State Store</li>
                <li>Tailwind CSS Theme</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} WorkBridge (Kerala). All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
